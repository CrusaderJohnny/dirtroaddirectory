"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
  Loader, // <--- Added: Import Loader
  Center, // <--- Added: Import Center
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconSearch,
  IconList,
  IconShoppingCart,
  IconCircleDot,
  IconMapPin,
  IconPhone,
  IconBrandFacebook,
  IconBrandInstagram,
  IconShare2,
} from "@tabler/icons-react";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import { trackEvent } from "@/analytics";

// Import the API fetching functions and interfaces
import { VendorsInterface, MarketsInterface } from '@/app/_types/interfaces';
import { AnalyticsTracker } from "@/app/_components/analytic-tracking/analyticsTracker";

// Removed the deprecated import:
// import favoriteVendorsAPI from "@/app/_components/apicomps/favoriteVendorCRUD";
import { useUser } from "@clerk/nextjs";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function VendorsContent() {
  const searchParams = useSearchParams();
  const vendorIdParam = searchParams.get("vendorId");

  const [vendors, setVendors] = useState<VendorsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state for vendors list
  const [error, setError] = useState<string | null>(null); // Error state for vendors list

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // <--- Added State for Associated Markets --->
  const [associatedMarkets, setAssociatedMarkets] = useState<MarketsInterface[]>([]);
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(false);
  const [errorLoadingMarkets, setErrorLoadingMarkets] = useState<string | null>(null);

  const { user } = useUser(); // Clerk user
  const [favoriteVendorIds, setFavoriteVendorIds] = useState<number[]>([]);

  // useEffect to fetch all vendor data when the component mounts
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

        if (user && user.id) {
          try {
            // Use the new API route for fetching favorite vendor IDs
            const favsResponse = await fetch(`/api/users/${user.id}/favourite-vendors`);
            if (!favsResponse.ok) {
              throw new Error(`Failed to fetch favorite vendor IDs: ${favsResponse.statusText}`);
            }
            const favVendorIds: string[] = await favsResponse.json();

            const numericFavs = favVendorIds
                .map((id) => Number(id))
                .filter((n) => Number.isFinite(n));
            setFavoriteVendorIds(numericFavs);
          } catch (favErr) {
            console.error("Failed to fetch vendor favorites:", favErr);
            // Do not block page if no favorites exist or an error occurs
          }
        }
      } catch (err) {
        console.error("Failed to load vendor data:", err);
        setError(err instanceof Error ? err.message : "Failed to load vendor data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]); // ← added user here to refetch when it becomes available

  const toggleFavoriteVendor = async (vendorId: number) => {
    if (!user || !user.id) return; // Ensure user and user.id exist

    const isFav = favoriteVendorIds.includes(vendorId);
    try {
      if (isFav) {
        // Use the new API route for removing a favorite vendor
        const response = await fetch(`/api/users/${user.id}/favourite-vendors/${vendorId.toString()}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error deleting favorite' }));
          throw new Error(errorData.message || `Failed to remove favorite vendor: ${response.statusText}`);
        }
        setFavoriteVendorIds(prev => prev.filter(id => id !== vendorId));
      } else {
        // Use the new API route for adding a favorite vendor
        const response = await fetch(`/api/users/${user.id}/favourite-vendors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vendor_id: vendorId.toString() }), // Ensure body matches backend expectation
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error adding favorite' }));
          throw new Error(errorData.message || `Failed to add favorite vendor: ${response.statusText}`);
        }
        setFavoriteVendorIds(prev => [...prev, vendorId]);
      }
    } catch (err) {
      console.error("Error updating favorite vendor:", err);
      // Optionally, show a user-friendly message for the error
    }
  };

  const selectedVendor = vendors.find((v) => v.id === Number(vendorIdParam));

  const handleVendorView = async (vendorName: string) => {
    await AnalyticsTracker('vendor_view', vendorName);
    trackEvent({
      name: 'view_vendor_profile',
      properties: {
        vendor_name: vendorName,
      },
    });
  };

  // <--- Added useEffect for fetching associated market details --->
  useEffect(() => {
    const fetchMarketDetailsForVendor = async () => {
      if (!selectedVendor || !selectedVendor.markets || selectedVendor.markets.length === 0) {
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
              console.warn(`Could not fetch details for market ID ${marketId}: HTTP status ${response.status}`);
              continue; // Skip this market but continue with others
            }
            const data = await response.json();
            fetchedMarketDetails.push(data);
          } catch (individualMarketError) {
            console.warn(`Could not fetch details for market ID ${marketId}:`, individualMarketError);
            // Optionally, add a placeholder market object or handle this error specifically
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

    // Only run this effect if a vendor is selected and its market IDs array is available
    if (selectedVendor) {
      fetchMarketDetailsForVendor();
      handleVendorView(selectedVendor.name);
    } else {
      setAssociatedMarkets([]); // Clear markets if no vendor is selected or removed
      setIsLoadingMarkets(false);
    }
  }, [selectedVendor]); // Re-run this effect whenever selectedVendor changes

  const filteredVendors = vendors.filter((vendor) => {
    const matchesName = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? vendor.category === selectedCategory : true;
    return matchesName && matchesCategory;
  });
  const allCategories = [...new Set(vendors.map((v) => v.category))];


  // Add loading and error states for initial render (all vendors list)
  if (loading) {
    return (
        <AppShellMain style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text size="xl">Loading vendor data...</Text>
        </AppShellMain>
    );
  }

  if (error) {
    return (
        <AppShellMain style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text size="xl" c="red">Error loading data: {error}</Text>
        </AppShellMain>
    );
  }

  // --- Vendor Detail View ---
  if (vendorIdParam && selectedVendor) {

    return (
        <AppShellMain style={{ minHeight: "100vh" }}>
          <Container size="lg" py="xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
                      margin: "0 auto",
                    }}
                />
                <Title
                    order={2}
                    mt="md"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: "#1f4d2e",
                      fontWeight: 800,
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card withBorder radius="md" style={{ backgroundColor: "#fff", marginBottom: "1.5rem", padding: "1.5rem" }}>
                <Group align="center" mb="sm">
                  <ThemeIcon variant="light" color="orange" radius="xl" size="lg"><IconList size={20} /></ThemeIcon>
                  <Title order={4} c="#1f4d2e" m={0}>Description</Title>
                </Group>
                <Text size="sm" c="gray.8">{selectedVendor.description || "No description available"}</Text>
              </Card>
            </motion.div>

            {/* Products Offered */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card withBorder radius="md" style={{ backgroundColor: "#fff", marginBottom: "1.5rem", padding: "1.5rem" }}>
                <Group align="center" mb="sm">
                  <ThemeIcon variant="light" color="green" radius="xl" size="lg"><IconShoppingCart size={20} /></ThemeIcon>
                  <Title order={4} c="#1f4d2e" m={0}>Products Offered</Title>
                </Group>
                {selectedVendor.products && selectedVendor.products.length > 0 ? (
                    <Grid gutter="md">
                      {selectedVendor.products.map((product, index) => (
                          <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
                            <Group gap="xs">
                              <ThemeIcon variant="light" color="dark" size="xs" radius="xs">
                                <IconCircleDot size={14} />
                              </ThemeIcon>
                              <Text size="sm">{product}</Text>
                            </Group>
                          </Grid.Col>
                      ))}
                    </Grid>
                ) : (
                    <Text size="sm" c="dimmed" ta="center">No product list available.</Text>
                )}
              </Card>
            </motion.div>

            {/* Markets Section - UPDATED */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card withBorder radius="md" style={{ backgroundColor: "#ffffff", marginBottom: "1.5rem", padding: "1.5rem" }}>
                <Title order={4} c="#1f4d2e" ta="center" mb="md">Find Us at Markets</Title>

                {isLoadingMarkets ? (
                    <Center>
                      <Loader /> <Text ml="sm">Loading market details...</Text>
                    </Center>
                ) : errorLoadingMarkets ? (
                    <Text c="red" ta="center">{errorLoadingMarkets}</Text>
                ) : associatedMarkets.length > 0 ? (
                    <Grid gutter="lg">
                      {associatedMarkets.map((market) => (
                          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={market.id}>
                            <Link href={`/markets?marketId=${market.id}`} passHref>
                              <Card withBorder radius="md" p="md" style={{ backgroundColor: "#f9fafb", cursor: "pointer" }}>
                                <Group mb="xs" gap="xs">
                                  <ThemeIcon variant="light" c="red" size="sm"><IconMapPin size={16} /></ThemeIcon>
                                  <Text fw={600} size="md" c="blue">{market.label}</Text>
                                </Group>
                                <Text size="xs" c="dimmed">Click to view more</Text>
                              </Card>
                            </Link>
                          </Grid.Col>
                      ))}
                    </Grid>
                ) : (
                    <Text ta="center" size="sm" c="dimmed">No market information available.</Text>
                )}
              </Card>
            </motion.div>

            {/* Contact + Social */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Card shadow="sm" radius="md" withBorder p="lg" bg="#e6f4ea">
                    <Group justify="center" mb="sm">
                      <ThemeIcon size="xl" radius="xl" c="green"><IconPhone size={28} /></ThemeIcon>
                    </Group>
                    <Title order={4} ta="center" c="dark.8" mb="sm">CONTACT</Title>
                    <Text size="sm"><strong>Phone:</strong> {selectedVendor.contact || 'Not available'}</Text>
                    <Text size="sm"><strong>Email:</strong> {selectedVendor.email ? (
                        <a href={`mailto:${selectedVendor.email}`} style={{ color: '#1e88e5' }}>{selectedVendor.email}</a>
                    ) : 'Not available'}</Text>
                    <Text size="sm"><strong>Website:</strong> {selectedVendor.website ? (
                        <a href={selectedVendor.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1e88e5' }}>{selectedVendor.website}</a>
                    ) : 'Not available'}</Text>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Card shadow="sm" radius="md" withBorder p="lg" bg="#d3d3d3">
                    <Group justify="center" mb="sm">
                      <ThemeIcon size="xl" radius="xl" color="gray"><IconShare2 size={28} /></ThemeIcon>
                    </Group>
                    <Title order={4} ta="center" c="dark.7">SOCIAL MEDIA</Title>

                    <Group justify="space-evenly" mt="md">
                      <Group gap={6}><IconBrandFacebook color="darkblue" /><Text size="sm">Facebook</Text></Group>
                      <Group gap={6}><IconBrandInstagram color="purple" /><Text size="sm">Instagram</Text></Group>
                    </Group>
                  </Card>
                </Grid.Col>
              </Grid>
            </motion.div>

            <Group justify="center" mt="xl">
              <Button component="a" href="/vendors" variant="outline" color="orange">← Back to all Vendors</Button>
            </Group>
          </Container>
        </AppShellMain>
    );
  }

  // --- All vendors list view (fallback) ---
  return (
      <AppShellMain style={{ minHeight: "100vh" }}>
        <Container size="xl" px="lg" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Paper shadow="md" p="lg" mt="xl" mb="lg" withBorder radius="md" bg="white">
            <Title order={1} mb={4} style={{ fontSize: "2rem", fontWeight: 700 }}>
              Our Vendors
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              Browse our trusted vendors by name or category
            </Text>
            <Group mb="lg" grow>
              <TextInput
                  placeholder="Search by name"
                  leftSection={<IconSearch size={16} />}
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
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={vendor.id}>
                  <VendorCard
                      vendor={vendor}
                      isFavorited={favoriteVendorIds.includes(vendor.id)}
                      onToggleFavorite={() => toggleFavoriteVendor(vendor.id)}
                  />
                </Grid.Col>
            ))}
          </Grid>
        </Container>
      </AppShellMain>
  );
}
