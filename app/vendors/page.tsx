'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Container, Grid, Title, Space, Divider, Text, Image, Button, Card, ThemeIcon, Group, List, TextInput, Select, Paper, AppShell } from '@mantine/core';
import { IconPhone, IconMail, IconWorld, IconBrandFacebook, IconBrandInstagram, IconShare2, IconCheck, IconSearch } from '@tabler/icons-react';
import vendorList from '@/app/_components/vendorcomps/vendordata';
import VendorCard from '@/app/_components/vendorcomps/vendorcard';
import NavMT from "@/app/_components/navcomps/navmt";

export default function VendorsPage() {
    const searchParams = useSearchParams();
    const vendorIdParam = searchParams.get('vendorId');
    const selectedVendor = vendorList.find((v) => v.id === Number(vendorIdParam));

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const filteredVendors = vendorList.filter((vendor) => {
    const matchesName = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? vendor.category === selectedCategory : true;
    return matchesName && matchesCategory;
    });
    const allCategories = [...new Set(vendorList.map((v) => v.category))];


  if (selectedVendor) {
    return (
      <AppShell>
        <AppShell.Header>
          <NavMT />
        </AppShell.Header>
        <AppShell.Main style={{ backgroundColor: '#f7f5f2', minHeight: '100vh' }}>
          <Container size="lg" py="xl">
            <Card withBorder shadow="sm" radius="md" p="md" mb="xl">
            <Image src={selectedVendor.image} alt={selectedVendor.name} height={300} radius="md" fit="cover" />
            </Card>

            <Title order={1} ta="center" fw={800} mb={4} c="dark.8">{selectedVendor.name}</Title>
            <Text ta="center" fw={600} size="lg" c="green.7">{selectedVendor.category}</Text>

            <Divider my="lg" />

            <Card withBorder shadow="xs" radius="md" p="lg" mb="lg" style={{ backgroundColor: '#fff' }}>
            <Text size="sm" c="gray.8"><strong>Description:</strong> {selectedVendor.description || 'No description available'}</Text>
            </Card>

            <Card withBorder shadow="xs" radius="md" p="lg" mb="xl" style={{ backgroundColor: '#ffffff' }}>
              <Title order={3} ta="center" c="green.8" mb="md">
                Products Offered
              </Title>
              <Grid>
                {selectedVendor.products && selectedVendor.products.length > 0 ? (
                  selectedVendor.products.map((product, index) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
                      <Text>• {product}</Text>
                    </Grid.Col>
                  ))
                ) : (
                  <Grid.Col span={{ base: 12 }}>
                    <Text ta="center" size="sm" c="dimmed">
                      No product list available.
                    </Text>
                  </Grid.Col>
                )}
              </Grid>
            </Card>

            <Card withBorder shadow="xs" radius="md" p="lg" mb="xl" style={{ backgroundColor: '#ffffff' }}>
              <Title order={3} ta="center" c="green.8" mb="md">
                Find Us at Markets
              </Title>
              
              {selectedVendor.markets && selectedVendor.markets.length > 0 ? (
                <Grid>
                  {selectedVendor.markets.map((market, index) => (
                    <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
                      <Text>• {market}</Text>
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
              <Text ta="center" size="sm" c="dimmed">
                No market information available.
              </Text>
              )}
            </Card>


            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="lg" style={{ backgroundColor: '#e6f4ea' }}>
                  <Group justify="center" mb="sm">
                    <ThemeIcon size="xl" radius="xl" color="green">
                      <IconPhone size={28} />
                    </ThemeIcon>
                  </Group>
                  <Title order={4} ta="center" c="dark.8" mb="sm">
                    CONTACT
                  </Title>
                  <Text size="sm"><strong> Phone: </strong>{selectedVendor.contact || 'Not available'}</Text>
                  <Text size="sm"><strong> Email: </strong> {selectedVendor.email || 'Not available'}</Text>
                  <Text size="sm"><strong> Website:</strong> {selectedVendor.website || 'Not available'}</Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="lg" style={{ backgroundColor: '#d3d3d3' }}>
                  <Group justify="center" mb="sm">
                    <ThemeIcon size="xl" radius="xl" color="gray"><IconShare2 size={28} /></ThemeIcon>
                  </Group>
                  <Title order={4} ta="center" c="dark.7">SOCIAL MEDIA</Title>
                  <Divider my="sm" />
                  <Group justify="space-evenly" mt="md">
                    <Group gap={6}><IconBrandFacebook color="darkblue" /><Text size="sm">Facebook</Text></Group>
                    <Group gap={6}><IconBrandInstagram color="purple" /><Text size="sm">Instagram</Text></Group>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
            <Space h="xl" />
            
            <Button component="a" href="/vendors" variant="light">Back to all vendors</Button>
          </Container>
      </AppShell.Main>
    </AppShell>
    );
  }

  return (
    <AppShell
    >
        <AppShell.Header component={NavMT}/>
        <AppShell.Main style={{ backgroundColor: '#f7f5f2', minHeight: '100vh' }}>
      
    <Paper shadow="md" p="lg" mb="xl" withBorder radius="md" style={{ backgroundColor: '#ffffff' }}>
        <Title order={1} mb={4} style={{ fontSize: '2rem', fontWeight: 700 }}>
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
    </AppShell.Main>
    </AppShell>
  );
}
