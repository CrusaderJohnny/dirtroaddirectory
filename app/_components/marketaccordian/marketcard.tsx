'use client';
import Link from "next/link";
import { Card, Image, Text, Title, useMantineTheme } from "@mantine/core";
import { MarketsInterface } from "@/app/_types/interfaces";

export default function MarketCard({ market }: { market: MarketsInterface }) {
  const theme = useMantineTheme();

  return (
    <Link href={`/markets?marketId=${market.id}`} passHref>
      <Card
        shadow="lg"
        radius="md"
        withBorder
        h="18rem"
        bg={theme.colors.primaryGreen[0]}
        style={{
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.md,
          border: `1px solid ${theme.colors.primaryGreen[2]}`,
        }}
      >
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
      </Card>
    </Link>
  );
}