"use client"; // <<< --- CRUCIAL: Mark this as a Client Component

import { useSearchParams } from "next/navigation";
import { Button, Container, Divider, Grid, Image, Space, Text, Title } from "@mantine/core";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import data from "../../_res/markets.json"; // Your market data

export default function MarketsContent() {
    const searchParams = useSearchParams();
    const marketIdParam = searchParams.get('marketId');
    const selectedMarket = data.find((v) => v.id === marketIdParam);

    if (selectedMarket) {
        return (
            <Container size="lg">
                <Image src={selectedMarket.image} alt={selectedMarket.label} height={300} radius="md"/>

                <Title order={1} className="text-green-700" ta="center">{selectedMarket.label}</Title>

                <Divider my="md"/>

                <Space h="md"/>

                <Text><strong>Location:</strong> {selectedMarket.content}</Text>

                <Text mt="md"><strong>Description:</strong> {selectedMarket.description || 'No description available'}</Text>

                <Space h="xl"/>

                <Button component="a" href="/markets" variant="light">Back to all markets</Button>
            </Container>
        );
    }

    // Default view: all markets
    return (
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
    );
}