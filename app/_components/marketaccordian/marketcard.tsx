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
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { MarketsInterface } from "@/app/_types/interfaces";

// Define the props for the MarketCard component
interface MarketCardProps {
    market: MarketsInterface;
    isFavorited: boolean;
    onToggleFavorite: () => Promise<void>;
    isTogglingFavorite: boolean;
}

export default function MarketCard({
                                       market,
                                       isFavorited,
                                       onToggleFavorite,
                                       isTogglingFavorite,
                                   }: MarketCardProps) {
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
                border: `1px solid ${theme.colors.gray[2]}`,
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
                        style={{ position: "absolute", bottom: 8, right: 8, zIndex: 10 }}
                        color="yellow"
                        disabled={isTogglingFavorite}
                    >
                        {isTogglingFavorite ? (
                            <Loader size={20} color="yellow" />
                        ) : isFavorited ? (
                            <IconStarFilled size={20} />
                        ) : (
                            <IconStar size={20} />
                        )}
                    </ActionIcon>
                </Tooltip>
            )}
            <Link href={`/markets?marketId=${market.id}`} passHref>
                <div>
                    <Image
                        src={market.image}
                        alt={market.label}
                        height={160}
                        radius="md"
                        fit="cover"
                        mb="sm"
                    />
                    <Title order={4} fw={600} mb={4}>
                        {market.label}
                    </Title>
                    <Text size="xs" c="dimmed">
                        {market.region}
                    </Text>
                </div>
            </Link>
        </Card>
    );
}