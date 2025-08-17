'use client';

import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {AppShell, AppShellSection, Card, Center, Container, Flex, Loader, Text, Button} from "@mantine/core";
import {ArticleInterface} from "@/app/_types/interfaces";
import NewsCardFullPage from '@/app/_components/newscomps/cards/newsCardFullPage';

export default function ArticleDetailsContent() {
    const searchParams = useSearchParams();
    const articleIdParam = searchParams.get('articleId');
    const articleId = articleIdParam ? parseInt(articleIdParam, 10) : null;

    const [article, setArticle] = useState<ArticleInterface | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getArticle = async () => {
            if (articleId === null || isNaN(articleId)) {
                console.error('ArticleDetailsContent: Invalid or missing articleId, cannot fetch.');
                setError("Invalid article ID");
                setLoading(false);
                return;
            }

            try {
                const url = `/api/articles/${articleId}`;
                const response = await fetch(url, {cache: 'no-store'});
                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Article not found");
                    } else {
                        setError(`Failed to fetch article: HTTP status ${response.status}`);
                    }
                    setLoading(false);
                    return;
                }

                const data: ArticleInterface = await response.json();

                if (!data || Number(data.post_id) !== articleId) {
                    setError("Article not found");
                } else {
                    setArticle(data);
                }
            } catch (err) {
                console.error("ArticleDetailsContent: Error fetching article:", err);
                setError("Failed to fetch article");
            } finally {
                setLoading(false);
            }
        };

        void getArticle();
    }, [articleId, articleIdParam]);

    if (loading) {
        return (
            <AppShell>
                <AppShellSection>
                    <Center h="400px">
                        <Container size="md" py="xl">
                            <Card>
                                <Flex
                                    justify="center"
                                    align="center"
                                    direction="column"
                                >
                                    <Text size="xl" fw={800} c="black">Loading Article...</Text>
                                    <Loader size={50} color="green"/>
                                </Flex>
                            </Card>
                        </Container>
                    </Center>
                </AppShellSection>
            </AppShell>
        );
    }

    if (error || !article) {
        return (
            <AppShell>
                <AppShellSection>
                    <Center h="400px">
                        <Container size="md" py="xl">
                        <Card >
                            <Flex
                                justify="center"
                                align="center"
                                direction="column"
                            >
                                <Text size="xl" fw={800} c="red">Error: Article Not Found</Text>
                                <Text size="xl" fw={800} c="black">The article you are looking for does not exist or the ID is invalid.</Text>
                                <Button component="a" href="/contact" mt="sm" fullWidth>
                                    Contact us about this issue
                                </Button>
                            </Flex>
                        </Card>
                        </Container>
                    </Center>
                </AppShellSection>
            </AppShell>
        )
            ;
    }

    return (
        <Container size="lg" py="xl">
            <NewsCardFullPage article={article}/>
        </Container>
    );
}