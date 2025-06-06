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
        <AppShell.Main>
          <Container size="lg" py="xl">
            <Image src={selectedVendor.image} alt={selectedVendor.name} height={300} radius="md" />
            <Space h="md" />
            <Title order={1} ta="center" fw={900} size="2.5rem" c="dark.9" mb="xs">{selectedVendor.name}</Title>
            <Divider my="md" size="xs" />
            <Text ta="center" fw={600} size="lg" c="green.7">{selectedVendor.category}</Text>

            <Text mt="md"><strong>Description:</strong> {selectedVendor.description || 'No description available'}</Text>
            <Space h="xl" />

            <Grid gutter="xl">
              <Grid.Col span={{ base: 12 }}>
                <Card shadow="sm" radius="md" withBorder p="md">
                  <Title order={3} ta="center" c="green.8">
                    Products Offered
                  </Title>
                  <Divider my="sm" />
                  
                  {selectedVendor.products && selectedVendor.products.length > 0 ? (
                    <List spacing="xs" size="sm">
                      {selectedVendor.products.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text size="sm" c="dimmed">No product list available</Text>
                  )}
                </Card>
              </Grid.Col>
            </Grid>

            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md">
                  <Group justify="center" mb="sm">
                    <ThemeIcon size="xl" radius="xl" color="green">
                      <IconPhone size={28} />
                    </ThemeIcon>
                  </Group>
                  <Title order={3} ta="center" className="green.8">
                    CONTACT
                  </Title>
                  <Divider my="sm" />
                  <Text size="sm"><strong> Phone: </strong>{selectedVendor.contact || 'Not available'}</Text>
                  <Text size="sm"><strong> Email: </strong> {selectedVendor.email || 'Not available'}</Text>
                  <Text size="sm"><strong> Website:</strong> {selectedVendor.website || 'Not available'}</Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card shadow="sm" radius="md" withBorder p="md">
                  <Group justify="center" mb="sm">
                    <ThemeIcon size="xl" radius="xl" color="lime"><IconShare2 size={28} /></ThemeIcon>
                  </Group>
                  <Title order={3} ta="center" c="green.8">SOCIAL MEDIA</Title>
                  <Divider my="sm" />
                  <Group justify="space-evenly" mt="md">
                    <Group gap={6}><IconBrandFacebook color="orange" /><Text size="sm">Facebook</Text></Group>
                    <Group gap={6}><IconBrandInstagram color="orange" /><Text size="sm">Instagram</Text></Group>
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
