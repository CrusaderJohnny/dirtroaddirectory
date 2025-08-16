"use client";

import {
    Card,
    Text,
    Image,
    Title,
    ActionIcon,
    Tooltip,
    useMantineTheme,
    Loader,
} from "@mantine/core";
import {IconStar, IconStarFilled} from "@tabler/icons-react";
import Link from "next/link";
import {VendorsInterface} from "@/app/_types/interfaces";

interface VendorCardProps {
    vendor: VendorsInterface;
    isFavorited: boolean;
    onToggleFavorite: () => Promise<void>;
    isTogglingFavorite: boolean;
}

export default function VendorCard({
                                       vendor,
                                       isFavorited,
                                       onToggleFavorite,
                                       isTogglingFavorite,
                                   }: VendorCardProps) {
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
                <Tooltip
                    label={
                        isTogglingFavorite
                            ? "Please wait..."
                            : isFavorited
                                ? "Remove from Favorites"
                                : "Add to Favorites"
                    }
                    withArrow
                    position="top"
                >
                    <ActionIcon
                        variant="light"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isTogglingFavorite) {
                                onToggleFavorite();
                            }
                        }}
                        style={{position: "absolute", bottom: 8, right: 8, zIndex: 10}}
                        color="yellow"
                        disabled={isTogglingFavorite}
                    >
                        {isTogglingFavorite ? (
                            <Loader size={20} color="yellow" />
                        ) : isFavorited ? (
                            <IconStarFilled size={20}/>
                        ) : (
                            <IconStar size={20}/>
                        )}
                    </ActionIcon>
                </Tooltip>
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
                    <Title order={4} fw={600} mb={4}>
                        {vendor.name}
                    </Title>
                    <Text size="xs" c="dimmed">
                        {vendor.category}
                    </Text>
                </div>
            </Link>
        </Card>
    );
}