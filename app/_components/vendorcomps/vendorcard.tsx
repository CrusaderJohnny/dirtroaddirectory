import { Card, Text, Image } from '@mantine/core';
import { VendorsInterface } from '@/app/_types/interfaces';
import Link from 'next/link';

export default function VendorCard({ vendor }: { vendor: VendorsInterface }) {
  return (
    <Link href={`/vendors?vendorId=${vendor.id}`} passHref>
      <Card withBorder radius="md" p="md" className="cursor-pointer">
        <Image src={vendor.image} alt={vendor.name} height={160} radius="md" />
        <Text fw={600} size="lg" mt="sm">{vendor.name}</Text>
        <Text size="sm" c="dimmed">Category: {vendor.category}</Text>
        <Text size="sm" c="dimmed">Location: {vendor.location}</Text>
      </Card>
    </Link>
  );
}

