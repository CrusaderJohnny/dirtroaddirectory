'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellFooter,
    Title,
    Container,
    Center,
    Text,
    Loader,
    Paper,
    Button
} from '@mantine/core';

import marketsAPI from '../_components/apicomps/marketsCRUD';


import MarketOwnerEditForm from '../_components/dashboardcomps/market_owner_edit_form';
import { MarketsInterface } from '@/app/_types/interfaces';


export default function TestMarketFetchPage() {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null; // Handle loading or not signed in state
    }

    const [marketData, setMarketData] = useState<MarketsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const UUID = user.id;


    console.log("Current UUID: "+UUID);

    useEffect(() => {
        const fetchMarket = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await marketsAPI.getMarketByUuid(UUID);
                setMarketData(data);
            } catch (err) {
                console.error("Error fetching market by UUID:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarket();
    }, []);



    return (
        <AppShell>
            <AppShellHeader>
                <NavMT />
            </AppShellHeader>
            <AppShellMain style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Test Page for `getMarketByUuid`
                    </Title>
                    <Center>
                        <Paper shadow="xs" p="lg" withBorder style={{ width: '100%', maxWidth: '800px' }}>
                            {loading && <Loader />}
                            {error && <Text color="red">Error: {error}</Text>}
                            {marketData && (
                                <MarketOwnerEditForm initialMarket={marketData} />
                            )}
                            {!loading && !marketData && !error && (
                                <Text>No market found for the provided UUID.</Text>
                            )}
                        </Paper>
                    </Center>
                </Container>
            </AppShellMain>
            <AppShellFooter style={{ backgroundColor: '#fff', padding: '1rem 0' }}>
                <Center>
                    <Text>
                        Test
                    </Text>
                </Center>
            </AppShellFooter>
        </AppShell>
    );
}
