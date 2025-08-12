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
    Card,
    Loader,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import favoritesMarketAPI from "@/app/_components/apicomps/favoritesMarketCRUD";
import favoriteVendorsAPI from "@/app/_components/apicomps/favoriteVendorCRUD";
import marketsAPI from "@/app/_components/apicomps/marketsCRUD";
import vendorsAPI from "@/app/_components/apicomps/vendorsCRUD";
import usersAPI from "@/app/_components/apicomps/usersCRUD";
import { MarketsInterface, VendorsInterface } from "@/app/_types/interfaces";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";

export default function UserContentPage() {
    const { user } = useUser();
    const [activeSegment, setActiveSegment] = useState<'Markets' | 'Vendors'>('Markets');

    const [favoriteMarkets, setFavoriteMarkets] = useState<MarketsInterface[]>([]);
    const [favoriteVendors, setFavoriteVendors] = useState<VendorsInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [dbUserId, setDbUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user) return;
            setLoading(true);

            try {
                const allUsers = await usersAPI.getAllUsers();
                const matchedUser = allUsers.find(
                    (u) => u.email === user.emailAddresses[0].emailAddress
                );

                if (!matchedUser) {
                    console.warn("No DB user found for Clerk email");
                    return;
                }

                const dbId = matchedUser.id.toString();
                setDbUserId(dbId);

                const [favMarketIds, favVendorIds] = await Promise.all([
                    favoritesMarketAPI.getFavoriteMarketIds(dbId),
                    favoriteVendorsAPI.getFavoriteVendorIds(dbId),
                ]);

                const [allMarkets, allVendors] = await Promise.all([
                    marketsAPI.getMarkets(),
                    vendorsAPI.getVendors(),
                ]);

                const filteredMarkets = allMarkets.filter(
                    (market) => favMarketIds.includes(market.id.toString())
                );
                const filteredVendors = allVendors.filter(
                    (vendor) => favVendorIds.includes(vendor.id.toString())
                );

                setFavoriteMarkets(filteredMarkets);
                setFavoriteVendors(filteredVendors);
            } catch (err) {
                console.error("[Favorites Page] Failed to load favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [user, activeSegment]);

    const renderCards = () => {
        if (loading) {
            return <Loader size="lg" />;
        }

        if (activeSegment === 'Markets') {
            const filtered = favoriteMarkets.filter(m => m.label.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filtered.length === 0) {
                return <Text size="sm" c="dimmed">No favorite markets match your search.</Text>;
            }
            return (
                <Grid gutter="xl">
                    {filtered.map((market) => (
                        <GridCol key={market.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <MarketCard
                                market={market}
                                isFavorited={true}
                                onToggleFavorite={async () => {
                                    if (!dbUserId) return;
                                    try {
                                        await favoritesMarketAPI.removeFavoriteMarket(dbUserId, market.id.toString());
                                        setFavoriteMarkets(prev => prev.filter(m => m.id !== market.id));
                                    } catch (err) {
                                        console.error("Error removing favorite market:", err);
                                    }
                                }}
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
                        <GridCol key={vendor.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <VendorCard
                                vendor={vendor}
                                isFavorited={true}
                                onToggleFavorite={async () => {
                                    if (!dbUserId) return;
                                    try {
                                        await favoriteVendorsAPI.removeFavoriteVendor(dbUserId, vendor.id.toString());
                                        setFavoriteVendors(prev => prev.filter(v => v.id !== vendor.id));
                                    } catch (err) {
                                        console.error("Error removing favorite vendor:", err);
                                    }
                                }}
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
                            <Title order={1} className="text-3xl font-bold mb-6 text-center">
                                {user?.firstName}&apos;s Favourites
                            </Title>
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
                            leftSection={<IconSearch size={16} />}
                            radius="md"
                            size="md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </Group>
                </Paper>

                <Card withBorder shadow="sm" radius="md" p="lg">
                    {renderCards()}
                </Card>
            </Stack>
        </Container>
    );
}