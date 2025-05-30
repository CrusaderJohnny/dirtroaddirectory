"use client";

import { Title, Container, Grid } from "@mantine/core";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import vendorList from "@/app/_components/vendorcomps/vendordata";
import { VendorsInterface } from "@/app/_types/interfaces";

export default function VendorsPage() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} className="text-3xl font-bold mb-6 text-center">
        Our Vendors
      </Title>

      <Grid gutter="xl">
        {vendorList.map((vendor: VendorsInterface) => (
            <Grid.Col key={vendor.id} span={{ base: 12, sm: 6, md: 4 }}>
                <VendorCard vendor={vendor} />
            </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}