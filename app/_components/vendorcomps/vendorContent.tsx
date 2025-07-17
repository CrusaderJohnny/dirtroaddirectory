"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
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
import vendorList from "../../_res/vendors.json";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import {trackEvent} from "@/analytics";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function VendorsContent() {
  const searchParams = useSearchParams();
  const vendorIdParam = searchParams.get("vendorId");
  const selectedVendor = vendorList.find((v) => v.id === Number(vendorIdParam));

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredVendors = vendorList.filter((vendor) => {
    const matchesName = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? vendor.category === selectedCategory : true;
    return matchesName && matchesCategory;
  });
  const allCategories = [...new Set(vendorList.map((v) => v.category))];

  const handleVendorView = (vendorId: string, vendorName: string) => {
    trackEvent({
      name: 'view_vendor_profile',
      properties: {
        vendor_id: vendorId,
        vendor_name: vendorName,
      },
    });
  };

  if (selectedVendor) {
    handleVendorView(selectedVendor.id.toString(), selectedVendor.name);
    return (
      <AppShellMain style={{ backgroundColor: "#fefbf6", minHeight: "100vh" }}>
        <Container size="lg" py="xl">
          {/* Hero Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder shadow="lg" radius="md" p={0} mb="xl" style={{ overflow: "hidden", position: "relative" }}>
              <Image src={selectedVendor.image} alt={selectedVendor.name} height={350} fit="cover" />
              <div style={{ position: "absolute", bottom: 0, width: "100%", background: "rgba(0,0,0,0.6)", padding: "1rem", color: "white", textAlign: "center", backdropFilter: "blur(4px)" }}>
                <Title order={2} fw={800}>{selectedVendor.name}</Title>
                <Text size="lg">{selectedVendor.category}</Text>
              </div>
            </Card>
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
              {selectedVendor.products?.length > 0 ? (
                <Grid gutter="md">
                  {selectedVendor.products.map((product, index) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
                      <Group gap="xs">
                        <ThemeIcon variant="light" color="dark" size="xs" radius="xs"><IconCircleDot size={14} /></ThemeIcon>
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

          {/* Markets Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder radius="md" style={{ backgroundColor: "#ffffff", marginBottom: "1.5rem", padding: "1.5rem" }}>
              <Title order={4} c="#1f4d2e" ta="center" mb="md">Find Us at Markets</Title>
              {selectedVendor.markets?.length ? (
                <Grid gutter="lg">
                  {selectedVendor.markets.map((market, idx) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={idx}>
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
        </motion.div>

        <Group justify="center" mt="xl">
          <Button component="a" href="/vendors" variant="outline" color="orange">← Back to all Vendors</Button>
        </Group>
        </Container>
      </AppShellMain>
    );
  }

  // All vendors list view (fallback)
  return (
    <AppShellMain style={{ backgroundColor: "#fefbf6", minHeight: "100vh" }}>
      <Paper shadow="md" p="lg" mb="xl" withBorder radius="md" bg="white">
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
            <VendorCard vendor={vendor} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShellMain>
  );
}
