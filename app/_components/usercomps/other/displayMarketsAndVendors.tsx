'use client';

import {
    Box,
    Grid,
    GridCol,
    Stack,
    Title,
    Center,
    Container,
    Card,
    Flex,
    Text,Divider
} from "@mantine/core";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import {MarketsInterface, VendorsInterface} from "@/app/_types/interfaces";

interface DisplayMarketsAndVendorsProps {
    filteredMarkets: MarketsInterface[];
    filteredVendors: VendorsInterface[];
    favoriteMarkets: number[];
    favoriteVendors: number[];
    handleToggleMarketFavorite: (marketId: number, isFavorited: boolean) => Promise<void>;
    handleToggleVendorFavorite: (vendorId: number, isFavorited: boolean) => Promise<void>;
    togglingItemId: number | null;
}

export default function DisplayMarketsAndVendors({
                                                     filteredMarkets,
                                                     filteredVendors,
                                                     favoriteMarkets,
                                                     favoriteVendors,
                                                     handleToggleMarketFavorite,
                                                     handleToggleVendorFavorite,
                                                     togglingItemId
                                                 }: DisplayMarketsAndVendorsProps) {
    const hasMarkets = filteredMarkets.length > 0;
    const hasVendors = filteredVendors.length > 0;

    if (!hasMarkets && !hasVendors) {
        return (
            <Center h="400px">
                <Container size="md" py="xl">
                    <Card>
                        <Flex justify="center" align="center" direction="column">
                            <Text size="xl" fw={800} c="black">
                                No markets or vendors found matching your search.
                            </Text>
                        </Flex>
                    </Card>
                </Container>
            </Center>
        );
    }

    return (
        <Stack gap="xl">
            {hasMarkets && (
                <Box>
                    <Container size="lg" mt='lg'>
                        <Card mb="md" bg="#ece2d2" radius="md" p="lg" withBorder>
                            <Title order={2} style={{color: "#1f4d2e", textAlign: "center"}}>
                                Markets
                            </Title>
                            <Divider/>
                            <Text ta="center" c="dimmed">
                                See all Markets & select your favourites
                            </Text>
                        </Card>
                    </Container>
                    <Grid gutter="xl">
                        {filteredMarkets.map((market) => {
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
                </Box>
            )}
            {hasVendors && (
                <Box>
                    <Container size="lg" mt='lg'>
                        <Card mb="md" bg="#ece2d2" radius="md" p="lg" withBorder>
                            <Title order={2} style={{color: "#1f4d2e", textAlign: "center"}}>
                                Vendors
                            </Title>
                            <Divider />
                            <Text ta="center" c="dimmed">
                                See all Vendors & select your favourites
                            </Text>
                        </Card>
                    </Container>
                    <Grid gutter="xl">
                        {filteredVendors.map((vendor) => {
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
                </Box>
            )}
        </Stack>
    );
}