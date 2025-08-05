'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    Title,
    Container,
    Center,
    Text,
    Loader,
    Paper
} from '@mantine/core';

import marketsAPI from '../_components/apicomps/marketsCRUD';


import MarketOwnerEditForm from '../_components/dashboardcomps/market_owner_edit_form';
import { MarketsInterface } from '@/app/_types/interfaces';


export default function TestMarketFetchPage() {
    const [marketData, setMarketData] = useState<MarketsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded, isSignedIn, user } = useUser();

    const UUID = user?.id;
    console.log("Current UUID: "+UUID);

    useEffect(() => {
        if (isLoaded && isSignedIn && UUID) {
            // If Clerk is loaded but the user is not signed in, stop loading and clear data.
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
        } else if (isLoaded && !isSignedIn) {
            // If Clerk is loaded but the user is not signed in, stop loading and clear data.
            setLoading(false);
            setMarketData(null);
            setError("Please sign in to view market data.");
        } else {
            // If Clerk is not yet loaded, keep loading state, no error
            // This case handles the initial render before Clerk fully loads
            setLoading(true);
            setMarketData(null);
            setError(null);
        }
    }, [isLoaded, isSignedIn, UUID]);


        if (!isLoaded || !isSignedIn) {
        return null; // Handle loading or not signed in state
    }






    return (
        <AppShell>
            <AppShellHeader>
                <NavMT />
            </AppShellHeader>
            <AppShellMain style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Edit Market Profile
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
        </AppShell>
    );
}
