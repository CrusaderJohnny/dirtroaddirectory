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
    Select,
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
import { MarketsInterface, VendorsInterface } from "@/app/_types/interfaces";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";

export default function UserContentPage() {
    const { user } = useUser();
    const [activeSegment, setActiveSegment] = useState<'Markets' | 'Vendors'>('Markets');

    const [favoriteMarkets, setFavoriteMarkets] = useState<MarketsInterface[]>([]);
    const [favoriteVendors, setFavoriteVendors] = useState<VendorsInterface[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const userId = 1; // Replace this with real mapping when needed

                if (activeSegment === 'Markets') {
                    const favIds = await favoritesMarketAPI.getFavoriteMarketIds(userId);
                    const allMarkets = await marketsAPI.getMarkets();
                    const filtered = allMarkets.filter((m) => favIds.includes(m.id));
                    setFavoriteMarkets(filtered);
                }

                if (activeSegment === 'Vendors') {
                    const favIds = await favoriteVendorsAPI.getFavoriteVendorIds(userId);
                    const allVendors = await vendorsAPI.getVendors();
                    const filtered = allVendors.filter((v) => favIds.includes(v.id));
                    setFavoriteVendors(filtered);
                }

            } catch (err) {
                console.error("Failed to load favorites:", err);
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
            if (favoriteMarkets.length === 0) {
                return <Text size="sm" c="dimmed">No favorite markets saved.</Text>;
            }
            return (
                <Grid gutter="xl">
                    {favoriteMarkets.map((market) => (
                        <GridCol key={market.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <MarketCard
                                market={market}
                                isFavorited={true}
                                onToggleFavorite={() => {}}
                            />
                        </GridCol>
                    ))}
                </Grid>
            );
        }

        if (activeSegment === 'Vendors') {
            if (favoriteVendors.length === 0) {
                return <Text size="sm" c="dimmed">No favorite vendors saved.</Text>;
            }
            return (
                <Grid gutter="xl">
                    {favoriteVendors.map((vendor) => (
                        <GridCol key={vendor.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <VendorCard
                                vendor={vendor}
                                isFavorited={true}
                                onToggleFavorite={() => {}}
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
                        />
                        <Select
                            placeholder="Filter by category"
                            clearable
                            radius="md"
                            size="md"
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
