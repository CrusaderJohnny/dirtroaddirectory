'use client';
import Link from "next/link";
import {Card, Image, Text, useMantineTheme} from "@mantine/core";
import {MarketsInterface} from "@/app/_types/interfaces";

export default function MarketCard({ market } : { market : MarketsInterface}) {
    const theme = useMantineTheme();
    return (
        <Link href={`/markets?marketId=${market.id}`} passHref>
            <Card
                shadow={'lg'}
                radius={'md'}
                withBorder={true}
                h={'18rem'}
                bg={theme.colors.primaryGreen[0]}
                style={{borderRadius: theme.radius.md, boxShadow: theme.shadows.md, border: `1px solid ${theme.colors.primaryGreen[2]}}`}}
            >
                <Image src={market.image} alt={market.label} height={160} radius="md" />
                <Text fw={600} size="lg" mt="sm">{market.label}</Text>
                <Text size="sm" c="dimmed">Category: {market.description}</Text>
            </Card>
        </Link>
    )
}