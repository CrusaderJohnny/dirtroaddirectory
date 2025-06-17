import {Card, Text, Image, Title, useMantineTheme} from '@mantine/core';
import { VendorsInterface } from '@/app/_types/interfaces';
import Link from 'next/link';

export default function VendorCard({ vendor }: { vendor: VendorsInterface }) {
    const theme = useMantineTheme();
  return (
    <Link href={`/vendors?vendorId=${vendor.id}`} passHref>
        <Card
            shadow={'lg'}
            radius={'md'}
            withBorder={true}
            h={'18rem'}
            bg={theme.colors.primaryGreen[0]}
            style={{borderRadius: theme.radius.md, boxShadow: theme.shadows.md, border: `1px solid ${theme.colors.primaryGreen[2]}}`}}
        >
        <Image src={vendor.image} alt={vendor.name} height={160} radius="md" fit="cover" mb="sm" />
        <Title order={4} fw ={600} mb={4}>{vendor.name}</Title>
        <Text size="sm" c="dimmed">Category: {vendor.category}</Text>
        <Text size="sm" c="dimmed">Location: {vendor.location}</Text>
      </Card>
    </Link>
  );
}

