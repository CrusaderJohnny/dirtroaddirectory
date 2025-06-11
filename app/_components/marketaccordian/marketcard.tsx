import Link from "next/link";
import {Card, Image, Text} from "@mantine/core";
import {MarketsInterface} from "@/app/_types/interfaces";

export default function MarketCard({ market } : { market : MarketsInterface}) {
    return (
        <Link href={`/markets?marketId=${market.id}`} passHref>
            <Card withBorder radius="md" p="md" className="cursor-pointer">
                <Image src={market.image} alt={market.label} height={160} radius="md" />
                <Text fw={600} size="lg" mt="sm">{market.label}</Text>
                <Text size="sm" c="dimmed">Category: {market.description}</Text>
            </Card>
        </Link>
    )
}