// updateList.tsx
import { Card, Text, Image, Title, Stack } from '@mantine/core';
import { UpdateArticle } from './types'; // Import the interface

interface UpdateListProps {
    updateList: UpdateArticle[];
    onUpdateClick: (update: UpdateArticle) => void;
}

export default function UpdateList({ updateList, onUpdateClick }: UpdateListProps) {
    return (
        <Stack>
            {updateList.map((update) => (
                <Card
                    key={update.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    onClick={() => onUpdateClick(update)} // Add onClick handler
                    style={{ cursor: 'pointer' }} // Indicate it's clickable
                >
                    <Card.Section>
                        <Image
                            src={update.imgLink}
                            height={100}
                            alt={update.title}
                            fit="cover"
                        />
                    </Card.Section>

                    <Title order={4} mt="md">{update.title}</Title>
                    <Text size="sm" c="dimmed">
                        {update.date}
                    </Text>
                </Card>
            ))}
        </Stack>
    );
}