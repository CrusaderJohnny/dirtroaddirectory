'use client';

import React, {useEffect, useState, useCallback, useRef} from "react";
import {useUser} from "@clerk/nextjs";
import {MarketsInterface, VendorsInterface, UserInfoInterface} from "@/app/_types/interfaces";
import MainUserPageReturn from "@/app/_components/usercomps/other/MainUserPageReturn";
import LoadingScreenComp from "@/_utils/loadingScreenComp";
import DisplayMarketsAndVendors from "@/app/_components/usercomps/other/displayMarketsAndVendors";
import NoFavsSetMessageComp from "@/app/_components/usercomps/other/noFavsSetMessageComp";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import {Grid, GridCol, Center, Container, Card, Flex, Text} from "@mantine/core";

export default function UserFavouritesPage() {
    const {user, isLoaded} = useUser();
    const [activeSegment, setActiveSegment] = useState<'Markets' | 'Vendors' | 'Find Favs'>('Find Favs');
    const [allMarkets, setAllMarkets] = useState<MarketsInterface[]>([]);
    const [allVendors, setAllVendors] = useState<VendorsInterface[]>([]);
    const [favoriteMarkets, setFavoriteMarkets] = useState<number[]>([]);
    const [favoriteVendors, setFavoriteVendors] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [dbUserId, setDbUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [togglingItemId, setTogglingItemId] = useState<number | null>(null);

    // Prevent StrictMode double-fetch on mount
    const didFetchRef = useRef(false);

    // Re-fetch user id after creation if the POST doesn't return it
    const requeryUserId = useCallback(async (email: string, attempts = 2): Promise<string | null> => {
        for (let i = 0; i <= attempts; i++) {
            const res = await fetch(`/api/users/`);
            if (!res.ok) break;
            const users: UserInfoInterface[] = await res.json();
            const found = users.find(u => u.email === email);
            if (found?.id) return String(found.id);
            // brief pause before next attempt
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return null;
    }, []);

    const fetchAllData = useCallback(async () => {
        if (!isLoaded || !user) return;
        setLoading(true);

        const userEmail =
            user.primaryEmailAddress?.emailAddress ||
            user.emailAddresses?.[0]?.emailAddress ||
            null;

        if (!userEmail) {
            // No email address on Clerk user.
            setLoading(false);
            return;
        }

        try {
            // 1) Find existing user
            const allUsersResponse = await fetch(`/api/users/`);
            if (!allUsersResponse.ok) throw new Error(`Failed to fetch all users: ${allUsersResponse.statusText}`);
            const allUsersData: UserInfoInterface[] = await allUsersResponse.json();
            let matchedUser = allUsersData.find((dbUser) => dbUser.email === userEmail);

            // 2) Create if missing
            if (!matchedUser) {
                const username = user.firstName || userEmail.split('@')[0];
                const createUserResponse = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, email: userEmail})
                });
                if (!createUserResponse.ok) {
                    const errorData = await createUserResponse.json().catch(() => ({message: 'Unknown error creating user'}));
                    throw new Error(errorData.message || `Failed to create user: ${createUserResponse.statusText}`);
                }

                type PartialUser = Partial<UserInfoInterface>;
                const created: PartialUser = await createUserResponse.json().catch(() => ({}));
                if (created.id) {
                    matchedUser = created as UserInfoInterface;
                } else {
                    const id = await requeryUserId(userEmail);
                    if (id) {
                        matchedUser = {
                            ...(created as object),
                            id: Number(id),
                            email: userEmail,
                            username
                        } as UserInfoInterface;
                    }
                }
            }

            // 3) If we have an id, store it (favorites can be fetched). If not, proceed without favorites.
            let resolvedUserId: string | null = null;
            if (matchedUser?.id) {
                resolvedUserId = String(matchedUser.id);
                setDbUserId(resolvedUserId);
            }

            // 4) Always fetch markets/vendors; favorites only if we have user id
            const [marketsResponse, vendorsResponse] = await Promise.all([
                fetch(`/api/markets`),
                fetch(`/api/vendors`)
            ]);
            if (!marketsResponse.ok || !vendorsResponse.ok) throw new Error("Failed to fetch all markets or vendors.");

            const [allMarketsData, allVendorsData]: [MarketsInterface[], VendorsInterface[]] = await Promise.all([
                marketsResponse.json(),
                vendorsResponse.json()
            ]);

            setAllMarkets(allMarketsData);
            setAllVendors(allVendorsData);

            if (resolvedUserId) {
                const [favMarketIdsResponse, favVendorIdsResponse] = await Promise.all([
                    fetch(`/api/users/${resolvedUserId}/favourite-markets`),
                    fetch(`/api/users/${resolvedUserId}/favourite-vendors`)
                ]);

                setFavoriteMarkets(
                    favMarketIdsResponse.ok
                        ? (await favMarketIdsResponse.json()).map(Number).filter(Number.isFinite)
                        : []
                );
                setFavoriteVendors(
                    favVendorIdsResponse.ok
                        ? (await favVendorIdsResponse.json()).map(Number).filter(Number.isFinite)
                        : []
                );
            } else {
                setFavoriteMarkets([]);
                setFavoriteVendors([]);
            }
        } catch (err) {
            console.error("[UserFavouritesPage] Fatal error during data load:", err);
        } finally {
            setLoading(false);
        }
    }, [isLoaded, user, requeryUserId]);

    useEffect(() => {
        if (!isLoaded) return;
        if (!user) {
            setLoading(false);
            return;
        }
        if (didFetchRef.current) return;
        didFetchRef.current = true;
        setSearchTerm('');
        fetchAllData();
    }, [isLoaded, user, fetchAllData]);

    const handleToggleMarketFavorite = async (marketId: number, isFavorited: boolean) => {
        if (!dbUserId) {
            console.error("DB User ID is not available. Cannot toggle market favorite.");
            return;
        }
        setTogglingItemId(marketId);
        try {
            const method = isFavorited ? 'DELETE' : 'POST';
            const body = isFavorited ? null : JSON.stringify({market_id: marketId});
            const response = await fetch(
                `/api/users/${dbUserId}/favourite-markets/${isFavorited ? marketId.toString() : ''}`,
                {method, headers: {'Content-Type': 'application/json'}, body}
            );
            if (!response.ok) throw new Error(`Failed to toggle favorite status: ${response.statusText}`);
            setFavoriteMarkets(prev => isFavorited ? prev.filter(id => id !== marketId) : [...prev, marketId]);
        } catch (err) {
            console.error("Error toggling favorite market:", err);
        } finally {
            setTogglingItemId(null);
        }
    };

    const handleToggleVendorFavorite = async (vendorId: number, isFavorited: boolean) => {
        if (!dbUserId) {
            console.error("DB User ID is not available. Cannot toggle vendor favorite.");
            return;
        }
        setTogglingItemId(vendorId);
        try {
            const method = isFavorited ? 'DELETE' : 'POST';
            const body = isFavorited ? null : JSON.stringify({vendor_id: vendorId});
            const response = await fetch(
                `/api/users/${dbUserId}/favourite-vendors/${isFavorited ? vendorId.toString() : ''}`,
                {method, headers: {'Content-Type': 'application/json'}, body}
            );
            if (!response.ok) throw new Error(`Failed to toggle favorite status: ${response.statusText}`);
            setFavoriteVendors(prev => isFavorited ? prev.filter(id => id !== vendorId) : [...prev, vendorId]);
        } catch (err) {
            console.error("Error toggling favorite vendor:", err);
        } finally {
            setTogglingItemId(null);
        }
    };

    const renderCards = () => {
        // Only block on Clerk readiness plus first data load
        if (!isLoaded || loading) {
            return <LoadingScreenComp pageName={'Favs'}/>;
        }

        // Precompute favorites and filters
        const favoriteMarketsInAll = allMarkets.filter(market => favoriteMarkets.includes(market.id));
        const favoriteVendorsInAll = allVendors.filter(vendor => favoriteVendors.includes(vendor.id));

        const filterBySearch = (text: string) => text.toLowerCase().includes(searchTerm.toLowerCase());

        // --- Markets segment: ONLY favorites ---
        if (activeSegment === 'Markets') {
            const filteredFavorites = favoriteMarketsInAll.filter(m => filterBySearch(m.label));
            const hasAnyFavorites = favoriteMarketsInAll.length > 0;

            if (!hasAnyFavorites && !searchTerm) {
                return <NoFavsSetMessageComp favType="Markets"/>;
            }
            if (searchTerm && filteredFavorites.length === 0) {
                return (
                    <Center h="400px">
                        <Container size="md" py="xl">
                            <Card>
                                <Flex justify="center" align="center" direction="column">
                                    <Text size="xl" fw={800} c="black">No markets found matching your search.</Text>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                );
            }

            const toRender = searchTerm ? filteredFavorites : favoriteMarketsInAll;
            return (
                <Grid gutter="xl">
                    {toRender.map((market) => {
                        const isFavorited = favoriteMarkets.includes(market.id);
                        return (
                            <GridCol key={market.id} span={{base: 12, sm: 6, md: 4}}>
                                <MarketCard
                                    market={market}
                                    isFavorited={isFavorited}
                                    onToggleFavorite={() => handleToggleMarketFavorite(market.id, isFavorited)}
                                    isTogglingFavorite={togglingItemId === market.id}
                                />
                            </GridCol>
                        );
                    })}
                </Grid>
            );
        }

        // --- Vendors segment: ONLY favorites ---
        if (activeSegment === 'Vendors') {
            const filteredFavorites = favoriteVendorsInAll.filter(v => filterBySearch(v.name));
            const hasAnyFavorites = favoriteVendorsInAll.length > 0;

            if (!hasAnyFavorites && !searchTerm) {
                return <NoFavsSetMessageComp favType="Vendors"/>;
            }
            if (searchTerm && filteredFavorites.length === 0) {
                return (
                    <Center h="400px">
                        <Container size="md" py="xl">
                            <Card>
                                <Flex justify="center" align="center" direction="column">
                                    <Text size="xl" fw={800} c="black">No vendors found matching your search.</Text>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                );
            }

            const toRender = searchTerm ? filteredFavorites : favoriteVendorsInAll;
            return (<>
                    <Grid gutter="xl">
                        {toRender.map((vendor) => {
                            const isFavorited = favoriteVendors.includes(vendor.id);
                            return (
                                <GridCol key={vendor.id} span={{base: 12, sm: 6, md: 4}}>
                                    <VendorCard
                                        vendor={vendor}
                                        isFavorited={isFavorited}
                                        onToggleFavorite={() => handleToggleVendorFavorite(vendor.id, isFavorited)}
                                        isTogglingFavorite={togglingItemId === vendor.id}
                                    />
                                </GridCol>
                            );
                        })}
                    </Grid>
                </>
            );
        }

        // --- Find Favs segment: ALL items (fav + non-fav), filtered by search if present ---
        if (activeSegment === 'Find Favs') {
            const filteredMarkets = searchTerm ? allMarkets.filter(m => filterBySearch(m.label)) : allMarkets;
            const filteredVendors = searchTerm ? allVendors.filter(v => filterBySearch(v.name)) : allVendors;

            const hasSearchResults = filteredMarkets.length > 0 || filteredVendors.length > 0;
            if (searchTerm && !hasSearchResults) {
                return (
                    <Center h="400px">
                        <Container size="md" py="xl">
                            <Card>
                                <Flex justify="center" align="center" direction="column">
                                    <Text size="xl" fw={800} c="black">No markets or vendors found matching your
                                        search.</Text>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                );
            }

            return (
                <DisplayMarketsAndVendors
                    filteredMarkets={filteredMarkets}
                    filteredVendors={filteredVendors}
                    favoriteMarkets={favoriteMarkets}
                    favoriteVendors={favoriteVendors}
                    handleToggleMarketFavorite={handleToggleMarketFavorite}
                    handleToggleVendorFavorite={handleToggleVendorFavorite}
                    togglingItemId={togglingItemId}
                />
            );
        }

        return null;
    };

    return (
        <MainUserPageReturn
            user={user}
            activeSegment={activeSegment}
            setActiveSegment={setActiveSegment}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            renderCards={renderCards}
        />
    );
}
