'use client';

import { useSearchParams } from 'next/navigation';
import {
  AppShellMain,
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
  TextInput,
  Select,
  Paper,
  Grid,
} from '@mantine/core';
import {
  IconPhone,
  IconMapPin,
  IconClockHour4,
  IconBrandFacebook,
  IconBrandInstagram,
  IconSearch,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MarketCard from '@/app/_components/marketaccordian/marketcard';
import data from '../../_res/markets.json';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function MarketContent() {
  const searchParams = useSearchParams();
  const marketId = searchParams.get('marketId');
  const selectedMarket = data.find((v) => v.id === Number(marketId));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const allRegions = [...new Set(data.map((market) => market.region))].filter(Boolean);

  const filteredMarkets = data.filter((market) => {
    const matchesName = market.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? market.region === selectedRegion : true;
    return matchesName && matchesRegion;
  });

  if (selectedMarket) {
    return (
      <AppShellMain style={{ backgroundColor: '#fefbf6', minHeight: '100vh' }}>
        <Container size="lg" py="xl">
          {/* Hero Image + Title */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder shadow="lg" radius="md" p={0} mb="xl" style={{ overflow: 'hidden' }}>
              <Image src={selectedMarket.image} alt={selectedMarket.label} height={300} fit="cover" />
            </Card>
            <Title order={1} c="#1f4d2e" ta="center" fw={800} mb="lg">
              {selectedMarket.label}
            </Title>
          </motion.div>

          {/* Description */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder radius="md" mb="lg" p="lg">
              <Title order={3} mb="xs" c="#1f4d2e">
                Description
              </Title>
              <Text size="sm">{selectedMarket.description || 'No description available'}</Text>
            </Card>
          </motion.div>

          {/* Info Cards */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
              {/* Location */}
              <Card withBorder radius="md" p="lg">
                <Group align="center" mb="xs">
                  <IconMapPin size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>
                    Location
                  </Title>
                </Group>
                <Text size="sm">{selectedMarket.region}</Text>
              </Card>

              {/* Hours */}
              <Card withBorder radius="md" p="lg">
                <Group align="center" mb="xs">
                  <IconClockHour4 size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>
                    Hours of Operation
                  </Title>
                </Group>
                <Text size="sm">{selectedMarket.hours}</Text>
              </Card>

              {/* Contact */}
              <Card withBorder radius="md" p="lg">
                <Group align="center" mb="xs">
                  <IconPhone size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>
                    Contact Us
                  </Title>
                </Group>
                <Text size="sm">
                  <strong>Phone:</strong> {selectedMarket.contact?.phone || 'Not available'}
                </Text>
                <Text size="sm">
                  <strong>Email:</strong> {selectedMarket.contact?.email || 'Not available'}
                </Text>
              </Card>

              {/* Social Media */}
              <Card withBorder radius="md" p="lg">
                <Group align="center" mb="xs">
                  <IconBrandFacebook size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>
                    Social Media
                  </Title>
                </Group>
                <Group gap="sm" mt="xs">
                  {selectedMarket.socials?.facebook && (
                    <Button
                      variant="light"
                      color="orange"
                      component="a"
                      href={selectedMarket.socials.facebook}
                      target="_blank"
                      leftSection={<IconBrandFacebook size={16} />}
                    >
                      Facebook
                    </Button>
                  )}
                  {selectedMarket.socials?.instagram && (
                    <Button
                      variant="light"
                      color="green"
                      component="a"
                      href={selectedMarket.socials.instagram}
                      target="_blank"
                      leftSection={<IconBrandInstagram size={16} />}
                    >
                      Instagram
                    </Button>
                  )}
                </Group>
              </Card>
            </SimpleGrid>
          </motion.div>

          {/* Events */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder radius="md" p="lg" mb="lg" style={{ backgroundColor: '#f4f1e8' }}>
              <Title order={4} c="#f26522" mb="xs">
                Events
              </Title>
              <Text size="sm">
                {selectedMarket.events?.length ? selectedMarket.events.join(', ') : 'No upcoming events listed.'}
              </Text>
            </Card>
          </motion.div>

          {/* Vendors at Market */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card withBorder radius="md" p="lg">
              <Title order={4} c="#1f4d2e" mb="sm">
                Vendors at this Market
              </Title>
              {Array.isArray(selectedMarket.vendors) && selectedMarket.vendors.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                  {selectedMarket.vendors.map((vendor) => (
                    <Card
                      key={vendor.id}
                      component="a"
                      href={`/vendors?vendorId=${vendor.id}`}
                      withBorder
                      shadow="xs"
                      radius="md"
                      p="md"
                      style={{
                        background: '#fafafa',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    >
                      <Text fw={600}>{vendor.name}</Text>
                      <Text size="xs" c="dimmed">
                        {vendor.category || 'No category'}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text size="sm" c="dimmed">
                  No vendors listed.
                </Text>
              )}
            </Card>
          </motion.div>

          <Group justify="center" mt="xl">
            <Button component="a" href="/markets" variant="outline" color="orange">
              ← Back to all markets
            </Button>
          </Group>
        </Container>
      </AppShellMain>
    );
  }

  // Fallback view: All Markets
  return (
    <AppShellMain style={{ backgroundColor: '#fefbf6', minHeight: '100vh', paddingTop: 0 }}>
      <Paper shadow="md" p="lg" mb="xl" withBorder radius="md" bg="white">
        <Title order={1} mb={4} style={{ fontSize: '2rem', fontWeight: 700 }}>
          All Markets
        </Title>
        <Text size="sm" c="dimmed" mb="md">
          Browse verified farmers' markets by name or region
        </Text>
        <Group mb="lg" grow>
          <TextInput
            placeholder="Search by market name"
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            radius="md"
            size="md"
          />
          <Select
            data={allRegions}
            placeholder="Filter by region"
            clearable
            value={selectedRegion}
            onChange={setSelectedRegion}
            radius="md"
            size="md"
          />
        </Group>
      </Paper>
      <Grid gutter="xl">
        {filteredMarkets.map((market) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={market.id}>
            <MarketCard market={market} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShellMain>
  );
}
