"use client";

import { useSearchParams } from 'next/navigation';
import {
    AppShellMain,
    Button,
    Card,
    Container,
    Group,
    Image,
    SimpleGrid,
    Text,
    Title,
    TextInput,
    Select,
    Paper,
    Grid,
} from '@mantine/core';
import {
    IconPhone,
    IconMapPin,
    IconClockHour4,
    IconBrandFacebook,
    IconBrandInstagram,
    IconSearch,
    IconCalendar,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MarketCard from '@/app/_components/marketaccordian/marketcard';
// import data from '../../_res/markets.json';
// import vendorList from '../../_res/vendors.json';
import { trackEvent } from "@/analytics";

// Import the API fetching functions and interfaces
import marketsAPI from '@/app/_components/apicomps/marketsCRUD';
import vendorsAPI from '@/app/_components/apicomps/vendorsCRUD';
import { MarketsInterface, VendorsInterface } from '@/app/_types/interfaces';
import {AnalyticsTracker} from "@/app/_components/analytic-tracking/analyticsTracker";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function MarketContent() {
    const searchParams = useSearchParams();
    const marketId = searchParams.get('marketId');

    // States for holding fetched data
    const [markets, setMarkets] = useState<MarketsInterface[]>([]);
    const [vendors, setVendors] = useState<VendorsInterface[]>([]); // State for vendor data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedMarkets = await marketsAPI.getMarkets();
                setMarkets(fetchedMarkets);

                const fetchedVendors = await vendorsAPI.getVendors();
                setVendors(fetchedVendors);
            } catch (err) {
                console.error("Failed to load data:", err);
                setError(err instanceof Error ? err.message : "Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []); // Empty dependency array means this runs once on mount

    const selectedMarket = markets.find((v) => v.id === Number(marketId));

    const allRegions = [...new Set(markets.map((market) => market.region as string))].filter(Boolean);

    const filteredMarkets = markets.filter((market) => {
        const matchesName = market.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion ? market.region === selectedRegion : true;
        return matchesName && matchesRegion;
    });
    const handleMarketView = async (marketName: string) => {
        await AnalyticsTracker('market_view', marketName);
        trackEvent({
            name: 'view_market_profile',
            properties: {
                market_name: marketName,
            },
        });
    };
    useEffect(() => {
        if(selectedMarket){
            handleMarketView(selectedMarket.label as string).then();
        }
    }, [selectedMarket]);

    // Add loading and error states for initial render
    if (loading) {
        return (
            <AppShellMain style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text size="xl">Loading market data...</Text>
            </AppShellMain>
        );
    }

    if (error) {
        return (
            <AppShellMain style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text size="xl" c="red">Error loading data: {error}</Text>
            </AppShellMain>
        );
    }

    // Conditional rendering for a specific market profile
    if (marketId && selectedMarket) { // Check if marketId is present and selectedMarket is found
        return (
            <AppShellMain style={{ minHeight: '100vh' }}>
                <Container size="lg" py="xl">
                    {/* Hero Image */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Card withBorder shadow="lg" radius="md" p={0} mb="xl" style={{ overflow: 'hidden', textAlign: 'center' }}>
                            <Image
                                src={selectedMarket.image}
                                alt={selectedMarket.label}
                                height={300}
                                fit="contain"
                                style={{ backgroundColor: 'white', padding: '1rem', width: '100%' }}
                            />
                            <div style={{ padding: '1rem' }}>
                                <Title order={2} style={{ fontFamily: 'Georgia, serif', color: '#1f4d2e', fontWeight: 700 }}>{selectedMarket.label}</Title>
                                <Text size="lg" c="dimmed">{selectedMarket.region}</Text>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Description */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Card withBorder radius="md" mb="lg" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                            <Title order={3} mb="xs" c="#1f4d2e">Description</Title>
                            <Text size="sm">{selectedMarket.description || 'No description available'}</Text>
                        </Card>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
                            {/* Location */}
                            <Card withBorder radius="md" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                                <Group align="center" mb="xs">
                                    <IconMapPin size={20} color="#f26522" />
                                    <Title order={5} c="#1f4d2e" m={0}>Location</Title>
                                </Group>
                                <Text size="sm">{selectedMarket.region}</Text>
                            </Card>

                            {/* Hours of Operation */}
                            <Card withBorder radius="md" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                                <Group align="center" mb="xs">
                                    <IconCalendar size={20} color="#f26522" />
                                    <Title order={5} c="#1f4d2e" m={0}>DAY/HOURS</Title>
                                </Group>
                                {selectedMarket.hours?.dateRange && (
                                    <Group align="center" gap="xs" mb="sm">
                                        <IconCalendar size={16} color="#f26522" />
                                        <Text size="sm">{selectedMarket.hours.dateRange}</Text>
                                    </Group>
                                )}
                                {Array.isArray(selectedMarket.hours?.days) && selectedMarket.hours.days.length > 0 && (
                                    <Group align="flex-start" gap="xs">
                                        <IconClockHour4 size={18} color="#f26522" style={{ marginTop: 4 }} />
                                        <div style={{ textAlign: 'left' }}>
                                            {selectedMarket.hours.days.map((entry, index) => (
                                                <Text size="sm" key={index}>{entry.day} {entry.time}</Text>
                                            ))}
                                        </div>
                                    </Group>
                                )}
                            </Card>

                            {/* Contact */}
                            <Card withBorder radius="md" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                                <Group align="center" mb="xs">
                                    <IconPhone size={20} color="#f26522" />
                                    <Title order={5} c="#1f4d2e" m={0}>Contact Us</Title>
                                </Group>
                                <Text size="sm"><strong>Phone:</strong> {selectedMarket.contact?.phone || 'Not available'}</Text>
                                <Text size="sm"><strong>Email:</strong> {selectedMarket.contact?.email || 'Not available'}</Text>
                            </Card>

                            {/* Social Media */}
                            <Card withBorder radius="md" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                                <Group align="center" mb="xs">
                                    <IconBrandFacebook size={20} color="#f26522" />
                                    <Title order={5} c="#1f4d2e" m={0}>Social Media</Title>
                                </Group>
                                <Group gap="sm" mt="xs">
                                    {selectedMarket.socials?.facebook && (
                                        <Button variant="light" color="orange" component="a" href={selectedMarket.socials.facebook} target="_blank" leftSection={<IconBrandFacebook size={16} />}>Facebook</Button>
                                    )}
                                    {selectedMarket.socials?.instagram && (
                                        <Button variant="light" color="green" component="a" href={selectedMarket.socials.instagram} target="_blank" leftSection={<IconBrandInstagram size={16} />}>Instagram</Button>
                                    )}
                                </Group>
                            </Card>
                        </SimpleGrid>
                    </motion.div>

                    {/* Events */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Card withBorder radius="md" p="lg" mb="lg" style={{ backgroundColor: '#f5deb3', textAlign: 'left' }}>
                            <Title order={4} c="#1f4d2e" mb="xs">Events</Title>
                            <Text size="sm">{selectedMarket.events?.length ? selectedMarket.events.join(', ') : 'No upcoming events listed.'}</Text>
                        </Card>
                    </motion.div>

                    {/* Vendors */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <Card withBorder radius="md" p="lg" style={{ backgroundColor: '#ffffff', textAlign: 'left' }}>
                            <Title order={4} c="#1f4d2e" mb="sm">Vendors at this Market</Title>
                            {Array.isArray(selectedMarket.vendors) && selectedMarket.vendors.length > 0 ? (
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                                    {selectedMarket.vendors.map((vendor) => {
                                        // Use the fetched 'vendors' array
                                        const vendorDetails = vendors.find((v) => v.id === vendor.id);
                                        return (
                                            <Card
                                                key={vendor.id}
                                                component="a"
                                                href={`/vendors?vendorId=${vendor.id}`}
                                                withBorder
                                                shadow="xs"
                                                radius="md"
                                                p="md"
                                                style={{ background: '#f3fbf5', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
                                            >
                                                {vendorDetails?.image && (
                                                    <Image src={vendorDetails.image} alt={vendor.name} height={120} fit="cover" radius="md" mb="sm" />
                                                )}
                                                <Text fw={600}>{vendor.name}</Text>
                                                <Text size="xs" c="dimmed">{vendor.category || 'No category'}</Text>
                                            </Card>
                                        );
                                    })}
                                </SimpleGrid>
                            ) : (
                                <Text size="sm" c="dimmed">No vendors listed.</Text>
                            )}
                        </Card>
                    </motion.div>

                    <Group justify="center" mt="xl">
                        <Button component="a" href="/markets" variant="outline" color="orange">← Back to all markets</Button>
                    </Group>
                </Container>
            </AppShellMain>
        );
    }

    // Default view for all markets (when no marketId is in search params)
    return (
        <AppShellMain style={{ minHeight: '100vh', paddingTop: 0 }}>
            <Paper shadow="md" p="lg" mb="xl" withBorder radius="md" bg="white">
                <Title order={1} mb={4} style={{ fontSize: '2rem', fontWeight: 700, color: '#1f4d2e', fontFamily: 'Georgia, serif' }}>All Markets</Title>
                <Text size="sm" c="dimmed" mb="md">Browse verified farmers&apos; markets by name or region</Text>
                <Group mb="lg" grow>
                    <TextInput placeholder="Search by market name" leftSection={<IconSearch size={16} />} value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} radius="md" size="md" />
                    <Select data={allRegions} placeholder="Filter by region" clearable value={selectedRegion} onChange={setSelectedRegion} radius="md" size="md" />
                </Group>
            </Paper>
            <Grid gutter="xl">
                {filteredMarkets.map((market) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={market.id}>
                        {/* Ensure MarketCard can accept the MarketsInterface type */}
                        <MarketCard market={market} />
                    </Grid.Col>
                ))}
            </Grid>
        </AppShellMain>
    );
}