'use client';

import {
    Container,
    Stack,
    Paper,
    Group,
    Box,
    Title,
    Text,
    SegmentedControl,
    TextInput,
    Grid,
    GridCol,
    Loader,
    Center, AppShellSection, Flex, AppShell, Card
} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useUser} from "@clerk/nextjs";
import React, {useEffect, useState, useCallback} from "react"; // Import useCallback
import {MarketsInterface, VendorsInterface, UserInfoInterface} from "@/app/_types/interfaces";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";

export default function UserContentPage() {
    const {user} = useUser();
    const [activeSegment, setActiveSegment] = useState<'Markets' | 'Vendors'>('Markets');

    const [favoriteMarkets, setFavoriteMarkets] = useState<MarketsInterface[]>([]);
    const [favoriteVendors, setFavoriteVendors] = useState<VendorsInterface[]>([]);

    const [loading, setLoading] = useState(false);
    const [dbUserId, setDbUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [togglingItemId, setTogglingItemId] = useState<number | null>(null);

    // Encapsulate the data fetching logic into a useCallback hook
    const loadFavorites = useCallback(async () => {
        if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
            console.log("User not available from Clerk. Skipping favorite load.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // 1. Fetch all users from your Next.js API route
            const usersResponse = await fetch(`/api/users`);
            if (!usersResponse.ok) {
                const errorText = await usersResponse.text();
                throw new Error(`Failed to fetch all users: ${usersResponse.statusText}. Response: ${errorText}`);
            }
            const allUsers: UserInfoInterface[] = await usersResponse.json();

            const matchedUser = allUsers.find(
                (u) => u.email === user.emailAddresses[0].emailAddress
            );

            if (!matchedUser || !matchedUser.id) {
                console.warn("No DB user found for Clerk email or user ID missing. Cannot load favorites.");
                setLoading(false);
                return;
            }
            const currentDbUserId = matchedUser.id.toString();
            setDbUserId(currentDbUserId);

            // 2. Fetch favorite market and vendor IDs using new API routes
            const [favMarketIdsResponse, favVendorIdsResponse] = await Promise.all([
                fetch(`/api/users/${currentDbUserId}/favourite-markets`),
                fetch(`/api/users/${currentDbUserId}/favourite-vendors`)
            ]);

            let favMarketIdsNumbers: number[] = [];
            if (!favMarketIdsResponse.ok) {
                if (favMarketIdsResponse.status === 404) {
                } else {
                    const errorText = await favMarketIdsResponse.text();
                    console.error(`[UserContentPage] Failed to fetch favorite market IDs: ${favMarketIdsResponse.statusText}. Response: ${errorText}`);
                }
            } else {
                const favMarketIdsStrings: string[] = await favMarketIdsResponse.json();
                favMarketIdsNumbers = favMarketIdsStrings.map(Number).filter(Number.isFinite);
            }

            let favVendorIdsNumbers: number[] = [];
            if (!favVendorIdsResponse.ok) {
                if (favVendorIdsResponse.status === 404) {
                } else {
                    const errorText = await favVendorIdsResponse.text();
                    console.error(`[UserContentPage] Failed to fetch favorite vendor IDs: ${favVendorIdsResponse.statusText}. Response: ${errorText}`);
                }
            } else {
                const favVendorIdsStrings: string[] = await favVendorIdsResponse.json();
                favVendorIdsNumbers = favVendorIdsStrings.map(Number).filter(Number.isFinite);
            }


            // 3. Fetch all markets and vendors
            const [allMarketsResponse, allVendorsResponse] = await Promise.all([
                fetch(`/api/markets`),
                fetch(`/api/vendors`)
            ]);

            if (!allMarketsResponse.ok) {
                const errorText = await allMarketsResponse.text();
                throw new Error(`Failed to fetch all markets: ${allMarketsResponse.statusText}. Response: ${errorText}`);
            }
            if (!allVendorsResponse.ok) {
                const errorText = await allVendorsResponse.text();
                throw new Error(`Failed to fetch all vendors: ${allVendorsResponse.statusText}. Response: ${errorText}`);
            }

            const allMarkets: MarketsInterface[] = await allMarketsResponse.json();
            const allVendors: VendorsInterface[] = await allVendorsResponse.json();

            // Filter based on fetched favorite IDs (all as numbers now)
            const filteredMarkets = allMarkets.filter(
                (market) => favMarketIdsNumbers.includes(market.id)
            );

            const filteredVendors = allVendors.filter(
                (vendor) => {
                    const isFavorited = favVendorIdsNumbers.includes(vendor.id);
                    return isFavorited;
                }
            );
            setFavoriteMarkets(filteredMarkets);
            setFavoriteVendors(filteredVendors);

        } catch (err) {
            console.error("[Favorites Page] Fatal error during loadFavorites:", err);
        } finally {
            setLoading(false);
        }
    }, [user]); // loadFavorites depends on 'user'

    // This useEffect handles the initial load and re-fetches on window focus
    useEffect(() => {
        loadFavorites(); // Initial load

        const handleFocus = () => {
            loadFavorites();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [loadFavorites]); // Dependency on loadFavorites (which is a useCallback)

    const handleToggleMarketFavorite = async (marketId: number) => {
        if (!dbUserId) {
            console.error("DB User ID is not available. Cannot toggle market favorite.");
            return;
        }

        setTogglingItemId(marketId);
        try {
            const response = await fetch(`/api/users/${dbUserId}/favourite-markets/${marketId.toString()}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Failed to remove favorite market: ${response.statusText}`);
            }

            setFavoriteMarkets(prev => {
                const updated = prev.filter(m => m.id !== marketId);
                return updated;
            });
        } catch (err) {
            console.error("Error removing favorite market:", err);
        } finally {
            setTogglingItemId(null);
        }
    };

    const handleToggleVendorFavorite = async (vendorId: number) => {
        if (!dbUserId) {
            console.error("DB User ID is not available. Cannot toggle vendor favorite.");
            return;
        }

        setTogglingItemId(vendorId);
        try {
            const response = await fetch(`/api/users/${dbUserId}/favourite-vendors/${vendorId.toString()}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Failed to remove favorite vendor: ${response.statusText}`);
            }

            setFavoriteVendors(prev => {
                const updated = prev.filter(v => v.id !== vendorId);
                return updated;
            });
        } catch (err) {
            console.error("Error removing favorite vendor:", err);
        } finally {
            setTogglingItemId(null);
        }
    };

    const renderCards = () => {
        if (loading) {
            return (
                <AppShell>
                    <AppShellSection>
                        <Center h="400px">
                            <Container size="md" py="xl">
                                <Card>
                                    <Flex
                                        justify="center"
                                        align="center"
                                        direction="column"
                                    >
                                        <Text size="xl" fw={800} c="balck">Loading your favorites...</Text>
                                        <Loader size={50} color="green"/>
                                    </Flex>
                                </Card>
                            </Container>
                        </Center>
                    </AppShellSection>
                </AppShell>
            );
        }

        if (activeSegment === 'Markets') {
            const filtered = favoriteMarkets.filter(m => m.label.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filtered.length === 0) {
                // return <Text size="sm" c="dimmed">No favorite markets match your search.</Text>;
            }
            return (
                <Grid gutter="xl">
                    {filtered.map((market) => (
                        <GridCol key={market.id} span={{base: 12, sm: 6, md: 4}}>
                            <MarketCard
                                market={market}
                                isFavorited={true}
                                onToggleFavorite={() => handleToggleMarketFavorite(market.id)}
                                isTogglingFavorite={togglingItemId === market.id}
                            />
                        </GridCol>
                    ))}
                </Grid>
            );
        }

        if (activeSegment === 'Vendors') {
            const filtered = favoriteVendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filtered.length === 0) {
                return <Text size="sm" c="dimmed">No favorite vendors match your search.</Text>;
            }
            return (
                <Grid gutter="xl">
                    {filtered.map((vendor) => (
                        <GridCol key={vendor.id} span={{base: 12, sm: 6, md: 4}}>
                            <VendorCard
                                vendor={vendor}
                                isFavorited={true}
                                onToggleFavorite={() => handleToggleVendorFavorite(vendor.id)}
                                isTogglingFavorite={togglingItemId === vendor.id}
                            />
                        </GridCol>
                    ))}
                </Grid>
            );
        }
    };

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <Paper shadow="md" p="lg" withBorder radius="md" bg="white">
                    <Group justify="space-between">
                        <Box>
                            {/* Conditional rendering for the Title */}
                            {user?.firstName ? (
                                <Title
                                    order={1}
                                    mb={4}
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        color: "#1f4d2e",
                                        fontFamily: "Georgia, serif"
                                    }}
                                >
                                    {user.firstName}&apos;s Favourites
                                </Title>
                            ) : (
                                // Render a placeholder title while the name is loading
                                <Title
                                    order={1}
                                    mb={4}
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        color: "#1f4d2e",
                                        fontFamily: "Georgia, serif"
                                    }}
                                >
                                    Your Favourites
                                </Title>
                            )}
                            <Text size="sm" c="dimmed" mb="md">
                                See what is happening with your favourite markets and vendors
                            </Text>
                        </Box>
                        <SegmentedControl
                            value={activeSegment}
                            onChange={(value) => setActiveSegment(value as 'Markets' | 'Vendors')}
                            transitionDuration={500}
                            transitionTimingFunction="ease-in-out"
                            color="blue"
                            data={['Markets', 'Vendors']}
                        />
                    </Group>
                    <Group mt="lg" grow>
                        <TextInput
                            placeholder="Search by name"
                            leftSection={<IconSearch size={16}/>}
                            radius="md"
                            size="md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </Group>
                </Paper>

                <Box>
                    {renderCards()}
                </Box>
            </Stack>
        </Container>
    );
}