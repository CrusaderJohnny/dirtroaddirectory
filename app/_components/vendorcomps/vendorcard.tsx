import { Card, Text, Image, Title } from '@mantine/core';
import { VendorsInterface } from '@/app/_types/interfaces';
import Link from 'next/link';

export default function VendorCard({ vendor }: { vendor: VendorsInterface }) {
  return (
    <Link href={`/vendors?vendorId=${vendor.id}`} passHref>
      <Card withBorder radius="md" p="md" className="w-full cursor-pointer hover:shadow-md transition-all">
        <Image src={vendor.image} alt={vendor.name} height={160} radius="md" fit="cover" mb="sm" />
        <Title order={4} fw ={600} mb={4}>{vendor.name}</Title>
        <Text size="sm" c="dimmed">Category: {vendor.category}</Text>
        <Text size="sm" c="dimmed">Location: {vendor.location}</Text>
      </Card>
    </Link>
  );
}

