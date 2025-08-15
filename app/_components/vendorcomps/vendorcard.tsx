'use client';

import Link from 'next/link';
import {
    Card,
    Text,
    Image,
    Title,
    ActionIcon,
    useMantineTheme
} from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { VendorsInterface } from '@/app/_types/interfaces';

interface VendorCardProps {
    vendor: VendorsInterface;
    isFavorited?: boolean;
    onToggleFavorite?: () => void;
}

export default function VendorCard({ vendor, isFavorited, onToggleFavorite }: VendorCardProps) {
    const theme = useMantineTheme();

    return (
        <Card
            shadow="lg"
            radius="md"
            withBorder
            h="18rem"
            bg={theme.colors.primaryGreen[0]}
            style={{
                position: "relative",
                border: `1px solid ${theme.colors.primaryGreen[2]}`,
            }}
        >
            {onToggleFavorite && (
                <ActionIcon
                    variant="light"
                    onClick={(e) => {
                        e.preventDefault(); // prevent link navigation
                        onToggleFavorite();
                    }}
                    style={{ position: "absolute", bottom: 8, right: 8, zIndex: 10 }}
                    color="yellow"
                >
                    {isFavorited ? <IconStarFilled size={20} /> : <IconStar size={20} />}
                </ActionIcon>
            )}
            <Link href={`/vendors?vendorId=${vendor.id}`} passHref>
                <div>
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        height={160}
                        radius="md"
                        fit="cover"
                        mb="sm"
                    />
                    <Title order={4} fw={600} mb={4}>{vendor.name}</Title>
                    <Text size="sm" c="dimmed">Category: {vendor.category}</Text>
                    <Text size="sm" c="dimmed">Location: {vendor.location}</Text>
                </div>
            </Link>
        </Card>
    );
}
