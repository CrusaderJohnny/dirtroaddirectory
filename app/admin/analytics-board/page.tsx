'use client';

import {
    AppShell,
    AppShellFooter,
    AppShellHeader,
    AppShellMain,
    Button,
    Center,
    Text,
    Container,
    Title,
    Loader,
    Alert,
    Paper,
    SimpleGrid,
    useMantineTheme, Stack
} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {BarChart, DonutChart} from '@mantine/charts';
import {useEffect, useState} from "react";
import {IconAlertCircle} from '@tabler/icons-react';
import {EventData} from "@/app/_types/interfaces";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';


export default function Page() {
    const theme = useMantineTheme();
    const [eventsData, setEventsData] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors
                const response = await fetch('/api/events'); // Your API endpoint
                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                }
                const data: EventData[] = await response.json();

                const transformedData = data.map(item => ({
                    ...item,
                    label: `${item.event_type} - ${item.event_name}`
                }));

                setEventsData(transformedData);
            } catch (e) {
                console.error("Failed to fetch events:", e);
                setError(`Failed to load analytics data: ${e instanceof Error ? e.message : "Unknown Error"}`);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents().then();
        // Refetch data every X seconds to keep dashboard updated
        const interval = setInterval(fetchEvents, 30000); // Refetch every 30 seconds
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once on mount

    const totalEvents = eventsData.reduce((sum, item) => sum + parseInt(item.count.toString(), 10), 0);
    const pageViewEvents = eventsData.filter(item => item.event_type === "page_view");
    const marketViewEvents = eventsData.filter(item => item.event_type === "market_view");
    const vendorViewEvents = eventsData.filter(item => item.event_type === "vendor_view");
    const eventsByTypeMap = eventsData.reduce((acc: { [key: string]: number }, item) => {
        acc[item.event_type] = (acc[item.event_type] || 0) + (+item.count);
        return acc;
    }, {});
    const eventsByTypeList = Object.entries(eventsByTypeMap).map(([type, count]) => ({
        type: type,
        count: count,
    })).sort((a, b) => b.count - a.count);

    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Container size="xl" py="md">
                    <Center mb="lg">
                        <Title order={2}>Admin Analytics Dashboard</Title>
                    </Center>

                    {loading && (
                        <Center>
                            <Loader size="lg"/>
                            <Text ml="md">Loading analytics data...</Text>
                        </Center>
                    )}

                    {error && (
                        <Alert variant="light" color="red" title="Error" icon={<IconAlertCircle/>}>
                            {error}
                        </Alert>
                    )}

                    {!loading && !error && (
                        <>
                            <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="lg" mt="xl">
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Total Recorded Events</Title>
                                    <Center style={{ height: 'calc(100% - 30px)' }}>
                                        <Stack align="center" gap="xs">
                                            {eventsData.length > 0 ? (
                                                <DonutChart
                                                    withLabelsLine
                                                    labelsType={'value'}
                                                    withLabels
                                                    data={
                                                        [
                                                            {name: "Event Counts", value: totalEvents, color: 'indigo.7'},
                                                            {name: "View Page", value: pageViewEvents.length, color: 'cyan.7'},
                                                            {name: "Market Views", value: marketViewEvents.length, color: 'teal.7'},
                                                            {name: "Vendor Views", value: vendorViewEvents.length, color: 'teal.3'}
                                                        ]
                                                    }
                                                />
                                            ) : (
                                                <Center>
                                                    <Text c={'dimmed'}>No event data available yet.</Text>
                                                </Center>
                                            )}

                                        </Stack>
                                    </Center>
                                </Paper>
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Events by Type</Title>
                                    {eventsByTypeList.length > 0 ? (
                                        <BarChart
                                            p={10}
                                            h={300}
                                            data={eventsByTypeList}
                                            dataKey={"type"}
                                            series={[{name: 'count', color: 'cyan.5'}]}
                                            orientation={'vertical'}
                                            gridAxis={'y'}
                                            tooltipProps={{
                                                cursor: { fill: 'transparent'},
                                            }}
                                            />
                                    ) : (
                                        <Center>
                                            <Text c={'dimmed'}>No event data available yet.</Text>
                                        </Center>
                                    )}
                                </Paper>
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Events by Name</Title>
                                    {eventsData.length > 0 ? (
                                        <BarChart
                                            h={300}
                                            data={eventsData}
                                            dataKey={'event_name'}
                                            series={[{name: 'count', color: 'indigo.7'}]}
                                            tickLine={'y'}
                                            gridAxis={'x'}
                                            yAxisProps={{
                                                domain: [0, 'auto'],
                                                allowDecimals: false,
                                            }}
                                        />
                                    ) : (
                                        <Center>
                                            <Text c="dimmed">No event data available yet.</Text>
                                        </Center>
                                    )}
                                </Paper>
                            </SimpleGrid>
                            <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="lg" mt="xl">
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Page View Events</Title>
                                    {pageViewEvents.length > 0 ? (
                                        <BarChart
                                            h={300}
                                            data={pageViewEvents}
                                            dataKey="event_name"
                                            withXAxis
                                            withYAxis
                                            withTooltip
                                            series={[{name: 'count', color: 'cyan.7'}]}
                                            gridAxis="x"
                                            yAxisProps={{
                                                domain: [0, 'auto'],
                                                allowDecimals: false,
                                            }}
                                        />
                                    ) : (
                                        <Center>
                                            <Text c="dimmed">No event data available yet.</Text>
                                        </Center>
                                    )}
                                </Paper>
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Market View Events</Title>
                                    {marketViewEvents.length > 0 ? (
                                        <BarChart
                                            h={300}
                                            data={marketViewEvents}
                                            dataKey="event_name"
                                            withXAxis
                                            withYAxis
                                            withTooltip
                                            series={[{name: 'count', color: 'teal.7'}]}
                                            gridAxis="x"
                                            yAxisProps={{
                                                domain: [0, 'auto'],
                                                allowDecimals: false,
                                            }}
                                        />
                                    ) : (
                                        <Center>
                                            <Text c="dimmed">No event data available yet.</Text>
                                        </Center>
                                    )}
                                </Paper>
                                <Paper shadow="sm" p="lg" withBorder bg={theme.colors[theme.primaryColor][0]}>
                                    <Title order={4} mb="md">Vendor View Events</Title>
                                    {vendorViewEvents.length > 0 ? (
                                        <BarChart
                                            h={300}
                                            data={vendorViewEvents}
                                            dataKey="event_name"
                                            withXAxis
                                            withYAxis
                                            withTooltip
                                            series={[{name: 'count', color: 'teal.3'}]}
                                            gridAxis="y"
                                            yAxisProps={{
                                                domain: [0, 'auto'],
                                                allowDecimals: false,
                                            }}
                                        />
                                    ) : (
                                        <Center>
                                            <Text c="dimmed">No event data available yet.</Text>
                                        </Center>
                                    )}
                                </Paper>
                            </SimpleGrid>
                        </>

                    )}
                </Container>
            </AppShellMain>
            <AppShellFooter>
                <Center py="sm">
                    <Button variant={'light'} component={'a'} href={'/admin'}>
                        Return to Admin Page
                    </Button>
                </Center>
            </AppShellFooter>
        </AppShell>
    );
}