"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {
    Container,
    Grid,
    Title,
    Text,
    Image,
    Card,
    ThemeIcon,
    Group,
    TextInput,
    Select,
    Paper,
    AppShellMain,
    Button,
    Loader,
    Center, AppShellSection, Flex, AppShell
} from "@mantine/core";
import {motion} from "framer-motion";
import {
    IconSearch,
    IconList,
    IconShoppingCart,
    IconCircleDot,
    IconMapPin,
    IconPhone,
    IconBrandFacebook,
    IconBrandInstagram,
    IconShare2
} from "@tabler/icons-react";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import {trackEvent} from "@/analytics";
import {
    VendorsInterface,
    MarketsInterface,
    UserInfoInterface
} from "@/app/_types/interfaces";
import {AnalyticsTracker} from "@/app/_components/analytic-tracking/analyticsTracker";
import {useUser} from "@clerk/nextjs";

const fadeInUp = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6}}
};

export default function VendorsContent() {
    const searchParams = useSearchParams();
    const vendorIdParam = searchParams.get("vendorId");

    const [vendors, setVendors] = useState<VendorsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [associatedMarkets, setAssociatedMarkets] = useState<
        MarketsInterface[]
    >([]);
    const [isLoadingMarkets, setIsLoadingMarkets] = useState(false);
    const [errorLoadingMarkets, setErrorLoadingMarkets] = useState<string | null>(
        null
    );

    const {user} = useUser(); // Clerk user
    const [favoriteVendorIds, setFavoriteVendorIds] = useState<number[]>([]);
    // State to store the user's ID from our database
    const [dbUserId, setDbUserId] = useState<number | null>(null);
    // State to prevent multiple clicks while a favorite action is in progress
    const [isTogglingFavorite, setIsTogglingFavorite] = useState<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const vendorResponse = await fetch(`/api/vendors/`);
                if (!vendorResponse.ok) {
                    throw new Error(`Failed to fetch vendors: ${vendorResponse.statusText}`);
                }
                const vendorsData = await vendorResponse.json();
                setVendors(vendorsData);

                if (user && user.emailAddresses && user.emailAddresses[0]) {
                    try {
                        const userEmail = user.emailAddresses[0].emailAddress;
                        let fetchedDbUserId: number | null = null;

                        // Step 1: Fetch all users from your database
                        const allUsersResponse = await fetch(`/api/users/`);
                        if (!allUsersResponse.ok) {
                            throw new Error(`Failed to fetch all users: ${allUsersResponse.statusText}`);
                        }
                        const allUsersData: UserInfoInterface[] = await allUsersResponse.json();
                        let matchedUser = allUsersData.find(
                            (dbUser) => dbUser.email === userEmail
                        );

                        // Step 2: If no user found, create one
                        if (!matchedUser) {
                            // console.log("No matching user found. Creating a new user...");
                            const username = userEmail.split('@')[0];
                            const createUserResponse = await fetch('/api/users/register', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username, email: userEmail }),
                            });

                            if (!createUserResponse.ok) {
                                const errorData = await createUserResponse.json();
                                throw new Error(`Failed to create user: ${errorData.message}`);
                            }

                            const newUser: UserInfoInterface = await createUserResponse.json();
                            matchedUser = newUser; // Use the newly created user for subsequent logic
                        }

                        if (matchedUser && matchedUser.id) {
                            fetchedDbUserId = matchedUser.id;
                            setDbUserId(fetchedDbUserId);

                            // Step 3: Use the new or existing user ID to fetch favorites
                            const favsResponse = await fetch(
                                `/api/users/${fetchedDbUserId}/favourite-vendors`
                            );
                            if (!favsResponse.ok) {
                                if (favsResponse.status === 404) {
                                    setFavoriteVendorIds([]);
                                    return;
                                }
                                throw new Error(
                                    `Failed to fetch favorite vendor IDs: ${favsResponse.statusText}`
                                );
                            }
                            const favVendorIds: string[] = await favsResponse.json();
                            const numericFavs = favVendorIds
                                .map((id) => Number(id))
                                .filter((n) => Number.isFinite(n));
                            setFavoriteVendorIds(numericFavs);
                        }
                    } catch (favErr) {
                        console.error("Failed to process user or fetch favorites:", favErr);
                        setDbUserId(null); // Clear ID on error
                        setFavoriteVendorIds([]);
                    }
                }
            } catch (err) {
                console.error("Failed to load vendor data:", err);
                setError(
                    err instanceof Error ? err.message : "Failed to load vendor data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user]);

    const toggleFavoriteVendor = async (vendorId: number) => {
        setIsTogglingFavorite(vendorId); // Set the vendor being toggled

        if (!user || dbUserId === null) {
            console.error("User or database ID is not available.");
            setIsTogglingFavorite(null); // Clear the state on error
            return;
        }

        const isFav = favoriteVendorIds.includes(vendorId);
        try {
            if (isFav) {
                // DELETE request
                const response = await fetch(
                    `/api/users/${dbUserId}/favourite-vendors/${vendorId.toString()}`,
                    {
                        method: "DELETE"
                    }
                );
                if (!response.ok) {
                    const errorData = await response
                        .json()
                        .catch(() => ({message: "Unknown error deleting favorite"}));
                    throw new Error(
                        errorData.message ||
                        `Failed to remove favorite vendor: ${response.statusText}`
                    );
                }
                setFavoriteVendorIds((prev) => prev.filter((id) => id !== vendorId));
            } else {
                // POST request
                const response = await fetch(`/api/users/${dbUserId}/favourite-vendors`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        user_id: dbUserId.toString(),
                        vendor_id: vendorId.toString()
                    })
                });
                if (!response.ok) {
                    const errorData = await response
                        .json()
                        .catch(() => ({message: "Unknown error adding favorite"}));
                    throw new Error(
                        errorData.message ||
                        `Failed to add favorite vendor: ${response.statusText}`
                    );
                }
                setFavoriteVendorIds((prev) => [...prev, vendorId]);
            }
        } catch (err) {
            console.error("Error updating favorite vendor:", err);
        } finally {
            setIsTogglingFavorite(null); // Clear the state when the action is complete
        }
    };

    const selectedVendor = vendors.find((v) => v.id === Number(vendorIdParam));

    const handleVendorView = async (vendorName: string) => {
        await AnalyticsTracker("vendor_view", vendorName);
        trackEvent({
            name: "view_vendor_profile",
            properties: {
                vendor_name: vendorName
            }
        });
    };

    useEffect(() => {
        const fetchMarketDetailsForVendor = async () => {
            if (
                !selectedVendor ||
                !selectedVendor.markets ||
                selectedVendor.markets.length === 0
            ) {
                setAssociatedMarkets([]);
                setIsLoadingMarkets(false);
                return;
            }

            setIsLoadingMarkets(true);
            setErrorLoadingMarkets(null);
            const fetchedMarketDetails: MarketsInterface[] = [];

            try {
                for (const marketId of selectedVendor.markets) {
                    try {
                        const response = await fetch(`/api/markets/${marketId}`);
                        if (!response.ok) {
                            console.warn(
                                `Could not fetch details for market ID ${marketId}: HTTP status ${response.status}`
                            );
                            continue;
                        }
                        const data = await response.json();
                        fetchedMarketDetails.push(data);
                    } catch (individualMarketError) {
                        console.warn(
                            `Could not fetch details for market ID ${marketId}:`,
                            individualMarketError
                        );
                    }
                }
                setAssociatedMarkets(fetchedMarketDetails);
            } catch (err) {
                console.error("Error fetching associated market details:", err);
                setErrorLoadingMarkets("Failed to load associated market details.");
            } finally {
                setIsLoadingMarkets(false);
            }
        };

        if (selectedVendor) {
            fetchMarketDetailsForVendor();
            handleVendorView(selectedVendor.name);
        } else {
            setAssociatedMarkets([]);
            setIsLoadingMarkets(false);
        }
    }, [selectedVendor]);

    const filteredVendors = vendors.filter((vendor) => {
        const matchesName = vendor.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
            ? vendor.category === selectedCategory
            : true;
        return matchesName && matchesCategory;
    });
    const allCategories = [...new Set(vendors.map((v) => v.category))];

    if (loading || (user && dbUserId === null)) {
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
                                    <Text size="xl" fw={800} c="black">Loading vendor data...</Text>
                                    <Loader size={50} color="green"/>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                </AppShellSection>
            </AppShell>
        );
    }

    if (error) {
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
                                    <Text size="xl" fw={800} c="red">Error loading data: {error}</Text>
                                    <Text size="xl" fw={800} c="black">We were unable to load this page, please come back later.</Text>
                                    <Button component="a" href="/contact" mt="sm" fullWidth>
                                        Contact us about this issue
                                    </Button>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                </AppShellSection>
            </AppShell>
        );
    }

    // --- Vendor Detail View ---
    if (vendorIdParam && selectedVendor) {
        return (
            <AppShellMain style={{minHeight: "100vh"}}>
                <Container size="lg" py="xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={fadeInUp}
                    >
                        <div style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Image
                                src={selectedVendor.image}
                                alt={selectedVendor.name}
                                height={350}
                                fit="cover"
                                style={{
                                    borderRadius: "12px",
                                    border: "4px solid #f0f0f0",
                                    objectFit: "cover",
                                    maxWidth: "100%",
                                    width: "auto",
                                    margin: "0 auto"
                                }}
                            />
                            <Title
                                order={2}
                                mt="md"
                                style={{
                                    fontFamily: "Georgia, serif",
                                    color: "#1f4d2e",
                                    fontWeight: 800
                                }}
                            >
                                {selectedVendor.name}
                            </Title>
                            <Text size="lg" c="dimmed">
                                {selectedVendor.category}
                            </Text>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={fadeInUp}
                    >
                        <Card
                            withBorder
                            radius="md"
                            style={{
                                backgroundColor: "#fff",
                                marginBottom: "1.5rem",
                                padding: "1.5rem"
                            }}
                        >
                            <Group align="center" mb="sm">
                                <ThemeIcon
                                    variant="light"
                                    color="orange"
                                    radius="xl"
                                    size="lg"
                                >
                                    <IconList size={20}/>
                                </ThemeIcon>
                                <Title order={4} c="#1f4d2e" m={0}>
                                    Description
                                </Title>
                            </Group>
                            <Text size="sm" c="gray.8">
                                {selectedVendor.description || "No description available"}
                            </Text>
                        </Card>
                    </motion.div>

                    {/* Products Offered */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={fadeInUp}
                    >
                        <Card
                            withBorder
                            radius="md"
                            style={{
                                backgroundColor: "#fff",
                                marginBottom: "1.5rem",
                                padding: "1.5rem"
                            }}
                        >
                            <Group align="center" mb="sm">
                                <ThemeIcon
                                    variant="light"
                                    color="green"
                                    radius="xl"
                                    size="lg"
                                >
                                    <IconShoppingCart size={20}/>
                                </ThemeIcon>
                                <Title order={4} c="#1f4d2e" m={0}>
                                    Products Offered
                                </Title>
                            </Group>
                            {selectedVendor.products && selectedVendor.products.length > 0 ? (
                                <Grid gutter="md">
                                    {selectedVendor.products.map((product, index) => (
                                        <Grid.Col span={{base: 12, sm: 6}} key={index}>
                                            <Group gap="xs">
                                                <ThemeIcon variant="light" color="dark" size="xs" radius="xs">
                                                    <IconCircleDot size={14}/>
                                                </ThemeIcon>
                                                <Text size="sm">{product}</Text>
                                            </Group>
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            ) : (
                                <Text size="sm" c="dimmed" ta="center">
                                    No product list available.
                                </Text>
                            )}
                        </Card>
                    </motion.div>

                    {/* Markets Section - UPDATED */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={fadeInUp}
                    >
                        <Card
                            withBorder
                            radius="md"
                            style={{
                                backgroundColor: "#ffffff",
                                marginBottom: "1.5rem",
                                padding: "1.5rem"
                            }}
                        >
                            <Title order={4} c="#1f4d2e" ta="center" mb="md">
                                Find Us at Markets
                            </Title>

                            {isLoadingMarkets ? (
                                <Center>
                                    <Loader/> <Text ml="sm">Loading market details...</Text>
                                </Center>
                            ) : errorLoadingMarkets ? (
                                <Text c="red" ta="center">
                                    {errorLoadingMarkets}
                                </Text>
                            ) : associatedMarkets.length > 0 ? (
                                <Grid gutter="lg">
                                    {associatedMarkets.map((market) => (
                                        <Grid.Col span={{base: 12, sm: 6, md: 4}} key={market.id}>
                                            <Link href={`/markets?marketId=${market.id}`} passHref>
                                                <Card
                                                    withBorder
                                                    radius="md"
                                                    p="md"
                                                    style={{
                                                        backgroundColor: "#f9fafb",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Group mb="xs" gap="xs">
                                                        <ThemeIcon variant="light" c="red" size="sm">
                                                            <IconMapPin size={16}/>
                                                        </ThemeIcon>
                                                        <Text fw={600} size="md" c="blue">
                                                            {market.label}
                                                        </Text>
                                                    </Group>
                                                    <Text size="xs" c="dimmed">
                                                        Click to view more
                                                    </Text>
                                                </Card>
                                            </Link>
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            ) : (
                                <Text ta="center" size="sm" c="dimmed">
                                    No market information available.
                                </Text>
                            )}
                        </Card>
                    </motion.div>

                    {/* Contact + Social */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={fadeInUp}
                    >
                        <Grid gutter="xl">
                            <Grid.Col span={{base: 12, sm: 6}}>
                                <Card shadow="sm" radius="md" withBorder p="lg" bg="#e6f4ea">
                                    <Group justify="center" mb="sm">
                                        <ThemeIcon size="xl" radius="xl" c="green">
                                            <IconPhone size={28}/>
                                        </ThemeIcon>
                                    </Group>
                                    <Title order={4} ta="center" c="dark.8" mb="sm">
                                        CONTACT
                                    </Title>
                                    <Text size="sm">
                                        <strong>Phone:</strong>{" "}
                                        {selectedVendor.contact || "Not available"}
                                    </Text>
                                    <Text size="sm">
                                        <strong>Email:</strong>{" "}
                                        {selectedVendor.email ? (
                                            <a
                                                href={`mailto:${selectedVendor.email}`}
                                                style={{color: "#1e88e5"}}
                                            >
                                                {selectedVendor.email}
                                            </a>
                                        ) : (
                                            "Not available"
                                        )}
                                    </Text>
                                    <Text size="sm">
                                        <strong>Website:</strong>{" "}
                                        {selectedVendor.website ? (
                                            <a
                                                href={selectedVendor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{color: "#1e88e5"}}
                                            >
                                                {selectedVendor.website}
                                            </a>
                                        ) : (
                                            "Not available"
                                        )}
                                    </Text>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{base: 12, sm: 6}}>
                                <Card shadow="sm" radius="md" withBorder p="lg" bg="#d3d3d3">
                                    <Group justify="center" mb="sm">
                                        <ThemeIcon size="xl" radius="xl" color="gray">
                                            <IconShare2 size={28}/>
                                        </ThemeIcon>
                                    </Group>
                                    <Title order={4} ta="center" c="dark.7">
                                        SOCIAL MEDIA
                                    </Title>

                                    <Group justify="space-evenly" mt="md">
                                        <Group gap={6}>
                                            <IconBrandFacebook color="darkblue"/>
                                            <Text size="sm">Facebook</Text>
                                        </Group>
                                        <Group gap={6}>
                                            <IconBrandInstagram color="purple"/>
                                            <Text size="sm">Instagram</Text>
                                        </Group>
                                    </Group>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </motion.div>

                    <Group justify="center" mt="xl">
                        <Button component="a" href="/vendors" variant="outline" color="orange">
                            ← Back to all Vendors
                        </Button>
                    </Group>
                </Container>
            </AppShellMain>
        );
    }

    // --- All vendors list view (fallback) ---
    return (
        <AppShellMain style={{minHeight: "100vh"}}>
            <Container
                size="xl"
                px="lg"
                style={{maxWidth: "1400px", margin: "0 auto", overflowY: "hidden"}}
            >
                <Paper
                    shadow="md"
                    p="lg"
                    mt="xl"
                    mb="lg"
                    withBorder
                    radius="md"
                    bg="white"
                >
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
                        All Vendors
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Browse our trusted vendors by name or category
                    </Text>
                    <Group mb="lg" grow>
                        <TextInput
                            placeholder="Search by name"
                            leftSection={<IconSearch size={16}/>}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
                            radius="md"
                            size="md"
                        />
                        <Select
                            data={allCategories}
                            placeholder="Filter by category"
                            clearable
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            radius="md"
                            size="md"
                        />
                    </Group>
                </Paper>

                <Grid gutter="xl">
                    {filteredVendors.map((vendor) => (
                        <Grid.Col span={{base: 12, sm: 6, md: 4}} key={vendor.id}>
                            <VendorCard
                                vendor={vendor}
                                isFavorited={favoriteVendorIds.includes(vendor.id)}
                                onToggleFavorite={() => toggleFavoriteVendor(vendor.id)}
                                isTogglingFavorite={isTogglingFavorite === vendor.id}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </AppShellMain>
    );
}