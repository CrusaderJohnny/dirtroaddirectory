'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Text,
    Divider,
    Button,
    Grid,
    AppShellSection,
    AppShell,
} from '@mantine/core';

import SiteIntroCard from '@/app/_components/newscomps/cards/siteIntroCard';
import FeaturedCard from '@/app/_components/newscomps/cards/featuredCard';
import ArticleCarousel from '@/app/_components/newscomps/articleCarousel';
import { ArticleInterface } from '@/app/_types/interfaces';

export default function Page() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await fetch('/api/articles', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                console.error('Failed to load articles:', err);
                setError('Failed to load articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    const featuredArticle = articles.find(article => Number(article.is_featured) === 1);
    const nonFeaturedArticles = articles.filter(article => Number(article.is_featured) !== 1);
    const hasNonFeaturedArticles = nonFeaturedArticles.length > 0;

    if (loading) {
        return <Text>Loading articles...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <AppShell>
            <AppShellSection>
                <Container size="xl" pt="lg">
                    <SiteIntroCard />
                    <Button component="a" href="/aboutus" mt="sm" fullWidth>
                        Learn More About Us
                    </Button>
                    <Divider my="md" />
                    <Container size="xl" p="sm">
                        <Grid mt="sm">
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                {featuredArticle ? (
                                    <FeaturedCard article={featuredArticle} />
                                ) : (
                                    <Text>No featured article available.</Text>
                                )}
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                {hasNonFeaturedArticles ? (
                                    <ArticleCarousel articles={nonFeaturedArticles} />
                                ) : (
                                    <Text>No other articles available.</Text>
                                )}
                            </Grid.Col>
                        </Grid>
                    </Container>
                </Container>
            </AppShellSection>
        </AppShell>
    );
}