"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Container, Text } from "@mantine/core";
import { fetchArticlesAsJson } from "@/app/_components/apicomps/articlefetch";
import { ArticleInterface } from "@/app/_types/interfaces";
import NewsCardFullPage from '@/app/_components/newscomps/cards/newsCardFullPage';

// Hardcoded data fro demo & testing
import articleData from "@/app/_res/articles.json";

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
                setError("Invalid article ID");
                setLoading(false);
                return;
            }

            try {
                // OPTION A: Use API
                // const data = await fetchArticlesAsJson();

                // OPTION B: Use HARDCODED DATA
                const data = articleData[0];

                const matchedArticle = data.find((item: ArticleInterface) => item.id === articleId);

                if (!matchedArticle) {
                    setError("Article not found");
                } else {
                    setArticle(matchedArticle);
                }
            } catch (err) {
                console.error("Error fetching article:", err);
                setError("Failed to fetch article");
            } finally {
                setLoading(false);
            }
        };

        void getArticle();
    }, [articleId]);

    if (loading) {
        return (
            <Container size="md" py="xl">
                <Text>Loading article...</Text>
            </Container>
        );
    }

    // Handle case where article is not found or ID is invalid
    if (error || !article) {
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
            <NewsCardFullPage article={article} />
        </Container>
    );
}