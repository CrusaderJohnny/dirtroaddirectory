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
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconSearch,
  IconList,
  IconShoppingCart,
  IconCircleDot,
  IconMapPin,
} from "@tabler/icons-react";
import vendorList from "../../_res/vendors.json";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";

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

  if (selectedVendor) {
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
                            <ThemeIcon variant="light" color="red" size="sm"><IconMapPin size={16} /></ThemeIcon>
                            <Text fw={600} size="md" color="blue">{market.label}</Text>
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
        {filteredVendors.map((vendor) => {
          const normalizedVendor = {
            ...vendor,
            markets: Array.isArray(vendor.markets)
              ? vendor.markets.map((market: any, idx: number) =>
                  typeof market === "string"
                    ? { id: idx.toString(), label: market }
                    : market
                )
              : [],
          };
          return (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={vendor.id}>
              <VendorCard vendor={normalizedVendor} />
            </Grid.Col>
          );
        })}
      </Grid>
    </AppShellMain>
  );
}
