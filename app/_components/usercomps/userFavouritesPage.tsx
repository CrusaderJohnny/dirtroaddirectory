'use client';

import { Container, Stack } from "@mantine/core";
import UserHeaderCard from "@/app/_components/usercomps/cards/userHeaderCard";
import UserContentCard from "@/app/_components/usercomps/cards/userContentCard";

export default function UserContentPage() {
    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <UserHeaderCard />
                <UserContentCard />
            </Stack>
        </Container>
    );
}
