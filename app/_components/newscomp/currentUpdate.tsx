
import { Container, Center, Box, Title, Text, Image } from '@mantine/core';
import { UpdateArticle } from "@/app/_components/newscomp/types";

interface CurrentUpdateProps {
    update: UpdateArticle | null;
}

export default function CurrentUpdate({ update }: CurrentUpdateProps) {
    if (!update) {
        return (
            <Center style={{ height: '100%' }}>
                <Text size="xl" c="dimmed">Select an update to view its content.</Text>
            </Center>
        );
    }

    return (
        <Box
            style={{
                width: '95%',
            }}
        >
            {/* Name of article */}
            <Title order={2}
                style={{
                    fontFamily: 'Monospace',
                }}
            >
                {update.title}
            </Title>

            {/* Date */}
            <Text>{update.date}</Text>

            {/* Page Image Here */}
            <Center>

                <Image
                    src={update.imgLink}
                    h={'20rem'}
                    w='auto'
                    fit='contain'
                    radius='md'
                    m='5px'
                    alt={`Article Image for ${update.title}`}
                />
            </Center>

            {/* Update Content Here */}
            <Text>
                {update.content}
            </Text>

        </Box>
    );
}