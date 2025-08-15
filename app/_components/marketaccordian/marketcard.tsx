'use client';
import Link from "next/link";
import { Card, Image, Text, Title, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { MarketsInterface } from "@/app/_types/interfaces";

interface MarketCardProps {
    market: MarketsInterface;
    isFavorited?: boolean;
    onToggleFavorite?: () => void;
}

export default function MarketCard({ market, isFavorited, onToggleFavorite }: MarketCardProps) {
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

            <Link href={`/markets?marketId=${market.id}`} passHref>
                <div>
                    <Image
                        src={market.image}
                        alt={market.label}
                        height={160}
                        radius="md"
                        fit="contain"
                        mb="sm"
                    />
                    <Title order={4} fw={600} mb={4}>{market.label}</Title>
                    <Text size="sm" c="dimmed">{market.region}</Text>
                </div>
            </Link>
        </Card>
    );
}
