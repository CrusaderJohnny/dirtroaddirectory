'use client';

import {
    Box,
    SegmentedControl,
    Group,
    Paper,
    Select,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import {
    // useState,
    // useEffect,
    React } from "react";
import {useUser} from "@clerk/nextjs";

export default function UserHeaderCard() {
    // const [isMarketPage, setIsMarketPage] = useState(false);
    const { user } = useUser();

    return (
        <Paper shadow="md" p="lg" withBorder radius="md" bg="white">
            <Group justify="space-between">
                <Box>
                    <Title order={1} className="text-3xl font-bold mb-6 text-center">{user?.firstName}&apos;s Favourites</Title>
                    <Text size="sm" c="dimmed" mb="md">
                        See what is happening with your favourite markets and vendors
                    </Text>
                </Box>
                <SegmentedControl
                    // value={isMarketPage}
                    // onChange={setIsMarketPage}
                    transitionDuration={500}
                    transitionTimingFunction="ease-in-out"
                    color="blue"
                    data={['Markets', 'Vendors']}
                />
            </Group>
            <Group mt="lg" grow>
                <TextInput
                    placeholder="Search by name"
                    leftSection={<IconSearch size={16} />}
                    radius="md"
                    size="md"
                />
                <Select
                    placeholder="Filter by category"
                    clearable
                    radius="md"
                    size="md"
                />
            </Group>
        </Paper>
    );
}
