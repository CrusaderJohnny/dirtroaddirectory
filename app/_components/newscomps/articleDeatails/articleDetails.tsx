"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Container, Text } from "@mantine/core";
import articlesAPI from "@/app/_components/apicomps/articlesCRUD";
import { ArticleInterface } from "@/app/_types/interfaces";
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
                setError("Invalid article ID");
                setLoading(false);
                return;
            }

            try {
                const data = await articlesAPI.getArticles();
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

    return (
        <Container size="lg" py="xl">
            <NewsCardFullPage article={article} />
        </Container>
    );
}
