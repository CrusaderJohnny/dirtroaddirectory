// app/news/ArticleDetailsContent.tsx
"use client"; // <<< --- CRUCIAL: Mark this as a Client Component

import { Card, Container, Text } from "@mantine/core";
import NewsData from "@/app/_components/newscomps/newsData"; // Assuming newsData is your array of articles
import { ArticleInterface } from "@/app/_types/interfaces"; // Import your articleSubPage interface
import NewsCardLarge from '@/app/_components/newscomps/cards/newsCardLarge'; // Your large card component
import { useSearchParams } from 'next/navigation';

export default function ArticleDetailsContent() {
    const searchParams = useSearchParams();
    const articleIdParam = searchParams.get('articleId'); // Get the articleId from the URL

    // Convert the ID to a number
    const articleId = articleIdParam ? parseInt(articleIdParam, 10) : null;

    // Find the article from your newsData
    const article: ArticleInterface | undefined = articleId !== null
        ? NewsData.find(item => item.id === articleId)
        : undefined;

    // Handle case where article is not found or ID is invalid
    if (article === undefined) {
        return (
            <Container size="md" py="xl">
                <Card withBorder shadow="sm" p="lg" radius="md">
                    <Text size="xl" fw={700}>Article Not Found</Text>
                    <Text mt="md">The article you are looking for does not exist or the ID is invalid.</Text>
                </Card>
            </Container>
        );
    }

    // If the article is found, render NewsCardLarge
    return (
        <Container size="lg" py="xl">
            {/* Pass the found article to your NewsCardLarge component */}
            <NewsCardLarge article={article} />
        </Container>
    );
}