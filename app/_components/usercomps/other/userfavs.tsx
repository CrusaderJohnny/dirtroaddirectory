'use client';

import { Card, Text } from "@mantine/core";

// Placeholder version of UserFavs (repeatable)
export default function UserFavs() {
    return (
        <Card shadow="sm" radius="md" withBorder p="md">
            <Text fw={600}>Favorite Market</Text>
            <Text c="dimmed" size="sm">This is a placeholder for a favorite market.</Text>
        </Card>
    );
}
