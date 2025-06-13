'use client'; // This page needs to be a client component to use useSearchParams

import { AppShell, Card, Container, Text } from "@mantine/core";
import NewsData from "@/app/_components/newscomps/newsData"; // Assuming newsData is your array of articles
import { ArticleInterface } from "@/app/_types/interfaces"; // Import your articleSubPage interface
import NewsCardLarge from '@/app/_components/newscomps/cards/newsCardLarge'; // Your large card component
import { useSearchParams } from 'next/navigation';
import NavMT from "@/app/_components/navcomps/navmt"; // Import useSearchParams

export default function ArticleDetailsPage() { // Renamed from NewsPage for clarity
    const searchParams = useSearchParams();
    const articleIdParam = searchParams.get('articleId'); // Get the articleId from the URL

    // Convert the ID to a number
    const articleId = articleIdParam ? parseInt(articleIdParam, 10) : null;

    // Find the articleSubPage from your newsData
    const article: ArticleInterface | undefined = articleId !== null
        ? NewsData.find(item => item.id === articleId)
        : undefined;

        // Handle case where articleSubPage is not found or ID is invalid
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

    // If the articleSubPage is found, render NewsCardLarge
    return (
        <>
            <AppShell
                header={{ height: '7vh' }}
            >
                <NavMT />
                <AppShell.Main>

                    <Container size="lg" py="xl">
                        {/* Pass the found articleSubPage to your NewsCardLarge component */}
                        <NewsCardLarge article={article} />
                    </Container>
                </AppShell.Main>
            </AppShell>
        </>
    );
}