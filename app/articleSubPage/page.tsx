'use client'; // This page needs to be a client component to use useSearchParams

import { AppShell, Card, Container, Text } from "@mantine/core";
import NewsData from "@/app/_components/newscomps/newsData"; // Adjust path if necessary
import { ArticleInterface } from "@/app/_types/interfaces"; // Adjust path if necessary
import NewsCardLarge from '@/app/_components/newscomps/cards/newsCardLarge'; // Adjust path if necessary
import { useSearchParams } from 'next/navigation';
import NavMT from "@/app/_components/navcomps/navmt"; // Adjust path if necessary

export default function ArticleDetailsPage() { // This component is now the default export for this route
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
            <>
                <AppShell
                    header={{ height: '7vh' }}
                >
                    <NavMT />
                    <AppShell.Main>
                        <Container size="md" py="xl">
                            <Card withBorder shadow="sm" p="lg" radius="md">
                                <Text size="xl" fw={700}>Article Not Found</Text>
                                <Text mt="md">The article you are looking for does not exist or the ID is invalid.</Text>
                            </Card>
                        </Container>
                    </AppShell.Main>
                </AppShell>
            </>
        );
    }

    // If the article is found, render NewsCardLarge
    return (
        <>
            <AppShell
                header={{ height: '7vh' }}
            >
                <NavMT />
                <AppShell.Main>
                    <Container size="lg" py="xl">
                        {/* Pass the found article to your NewsCardLarge component */}
                        <NewsCardLarge article={article} />
                    </Container>
                </AppShell.Main>
            </AppShell>
        </>
    );
}