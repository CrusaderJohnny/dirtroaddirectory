"use client";

import { Title, Container } from "@mantine/core";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";
import vendorList from "@/app/_components/vendorcomps/vendordata";
import { VendorsInterface } from "@/app/_types/interfaces";

export default function VendorsPage() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} className="text-3xl font-bold mb-6 text-center">
        Our Vendors
      </Title>

      <div className="flex flex-col gap-4">
        {vendorList.map((vendor: VendorsInterface) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </Container>
  );
}