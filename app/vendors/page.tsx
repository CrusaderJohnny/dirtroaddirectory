'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Grid, Title, Space, Divider, Text, Image, Button, Card } from '@mantine/core';
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
        <Title order={1} className="text-green-700" ta="center">{selectedVendor.name}</Title>
        <Divider my="md" />
        <Text ta="center" fw={700} size="lg" c="green">{selectedVendor.category}</Text>

        <Text mt="md"><strong>Description:</strong> {selectedVendor.description || 'No description available'}</Text>
        <Space h="xl" />

        <Grid gutter="xl">

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card shadow="sm" radius="md" withBorder p="md">
            <Title order={3} mb="sm" className="text-green-700">
              Contact
            </Title>
            <Text size="sm">
              <strong>Email:</strong> {selectedVendor.contact || "Not available"}
            </Text>
            <Text size="sm">
              <strong>Website:</strong>{" "}
              <a href="https://www.vendorwebsite.com" target="_blank" className="text-blue-600 underline">
                www.vendorwebsite.com
              </a>
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card shadow="sm" radius="md" withBorder p="md">
            <Title order={3} mb="sm" className="text-green-700">
              Markets
            </Title>
            <Text size="sm">
              {selectedVendor.markets?.join(", ") || "Not listed"}
            </Text>
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
