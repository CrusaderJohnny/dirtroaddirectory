
'use client';

import React, { useEffect, useState } from 'react';
import { fetchArticlesAsJson } from '@/app/_components/apicomps/articlefetch';
import { ArticleInterface } from '@/app/_types/interfaces';
import { Container, Text, Loader, Paper, Title } from '@mantine/core';

export default function TestArticlesPage() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                setLoading(true);
                setError(null); // Clear any previous errors
                const data = await fetchArticlesAsJson();
                setArticles(data);
            } catch (err) {
                console.error('Error fetching articles for test page:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching articles.');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return (
            <Container size="md" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Loader size="lg" />
                <Text mt="md">Loading articles from API...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="md" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Text color="red" size="lg">Error: {error}</Text>
                <Text size="sm" mt="sm">Please check your Docker containers and API endpoint.</Text>
            </Container>
        );
    }

    if (articles.length === 0) {
        return (
            <Container size="md" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Text size="lg">No articles found.</Text>
                <Text size="sm" mt="sm">Ensure your database has data and your API returns it.</Text>
            </Container>
        );
    }

    return (
        <Container size="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <Title order={1} mb="xl" style={{ textAlign: 'center' }}>API Articles Test Page</Title>
            <Paper p="md" shadow="xs" withBorder>
                <Text size="xl" mb="md" fw={700}>Successfully fetched articles:</Text>
                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <Text size="lg" fw={500}>{article.title}</Text>
                            <Text size="sm" c="dimmed">{article.date}</Text>
                            <Text size="sm">{article.summary}</Text>
                            <hr />
                        </li>
                    ))}
                </ul>
            </Paper>
        </Container>
    );
}