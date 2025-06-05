'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Grid, Title, Space, Divider, Text, Image, Button, Card, ThemeIcon, Group, List } from '@mantine/core';
import { IconPhone, IconMail, IconWorld, IconBrandFacebook, IconBrandInstagram, IconShare2, IconCheck } from '@tabler/icons-react';
import vendorList from '@/app/_components/vendorcomps/vendordata';
import VendorCard from '@/app/_components/vendorcomps/vendorcard';

export default function VendorsPage() {
  const searchParams = useSearchParams();
  const vendorIdParam = searchParams.get('vendorId');
  const selectedVendor = vendorList.find((v) => v.id === Number(vendorIdParam));

  if (selectedVendor) {
    return (
      <Container size="lg" py="xl">
        <Image src={selectedVendor.image} alt={selectedVendor.name} height={300} radius="md" />
        <Space h="md" />
        <Title order={1} c="green.8" ta="center">{selectedVendor.name}</Title>
        <Divider my="md" />
        <Text ta="center" fw={700} size="xl" c="green.8">{selectedVendor.category}</Text>

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
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} className="text-3xl font-bold mb-6 text-center">Our Vendors</Title>
      <Grid gutter="xl">
        {vendorList.map((vendor) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={vendor.id}>
            <VendorCard vendor={vendor} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
