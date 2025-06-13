"use client";
import {useSearchParams} from "next/navigation";
import {AppShell, Button, Container, Divider, Grid, Image, Space, Text, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import data from "../_res/markets.json"

export default function MarketsPage() {
    const searchParams = useSearchParams();
    const marketIdParam = searchParams.get('marketId');
    const selectedMarket = data.find((v) => v.id === marketIdParam);

    if (selectedMarket) {
        return (
            <AppShell>
                <AppShell.Header
                    component={NavMT}/>
                <AppShell.Main>
                    <Container size="lg">
                        <Image src={selectedMarket.image} alt={selectedMarket.label} height={300} radius="md"/>

                        <Title order={1} className="text-green-700" ta="center">{selectedMarket.label}</Title>

                        <Divider my="md"/>

                        <Space h="md"/>

                        <Text><strong>Location:</strong> {selectedMarket.content}</Text>

                        <Text
                            mt="md"><strong>Description:</strong> {selectedMarket.description || 'No description available'}
                        </Text>

                        <Space h="xl"/>

                        <Button component="a" href="/markets" variant="light">Back to all markets</Button>
                    </Container>
                </AppShell.Main>
            </AppShell>
        );
    }

    return (
        <AppShell
        >
            <AppShell.Header component={NavMT}/>
            <AppShell.Main>
                <Container size="xl" py="xl">
                    <Title order={1} className="text-3xl font-bold mb-6 text-center">Our Markets</Title>
                    <Grid gutter="xl">
                        {data.map((market) => (
                            <Grid.Col span={{base: 12, sm: 6, md: 4}} key={market.id}>
                                <MarketCard market={market}/>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Container>
            </AppShell.Main>
        </AppShell>

    );
}