'use client';

import React from 'react';
import {
    Container, Stack, Paper, Group, Box, Title, Text, SegmentedControl, TextInput,
} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {UserResource} from "@clerk/types";

interface MainUserPageReturnProps {
    user: UserResource | null | undefined;
    activeSegment: 'Markets' | 'Vendors' | 'Find Favs';
    setActiveSegment: (value: 'Markets' | 'Vendors' | 'Find Favs') => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    renderCards: () => React.ReactNode;
}

export default function MainUserPageReturn({
                                               user,
                                               activeSegment,
                                               setActiveSegment,
                                               searchTerm,
                                               setSearchTerm,
                                               renderCards
                                           }: MainUserPageReturnProps) {
    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <Paper shadow="md" p="lg" withBorder radius="md" bg="white">
                    <Group justify="space-between" align="flex-end">
                        <Box>
                            {user?.firstName ? (
                                <Title
                                    order={1}
                                    mb={4}
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        color: "#1f4d2e",
                                        fontFamily: "Georgia, serif"
                                    }}
                                >
                                    {user.firstName}&apos;s Content
                                </Title>
                            ) : (
                                <Title
                                    order={1}
                                    mb={4}
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        color: "#1f4d2e",
                                        fontFamily: "Georgia, serif"
                                    }}
                                >
                                    Your Content
                                </Title>
                            )}
                            <Text size="sm" c="dimmed" mb="md">
                                See all markets and vendors, or view your favorites.
                            </Text>

                        </Box>
                        <SegmentedControl
                            value={activeSegment}
                            onChange={(value) => setActiveSegment(value as 'Markets' | 'Vendors' | 'Find Favs')}
                            transitionDuration={500}
                            transitionTimingFunction="ease-in-out"
                            color="blue"
                            data={['Find Favs', 'Markets', 'Vendors']}
                        />
                    </Group>
                    <Group mt="lg" grow>
                        <TextInput
                            placeholder="Search by name"
                            leftSection={<IconSearch size={16}/>}
                            radius="md"
                            size="md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </Group>
                </Paper>
                <Box>
                    {renderCards()}
                </Box>
            </Stack>
        </Container>
    );
}