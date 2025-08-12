'use client';

import React, { useState, useEffect } from 'react';
import {
    Container,
    Text,
    Divider,
    Button,
    Box,
    Grid,
    AppShellSection,
    GridCol,
    AppShell,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import SiteIntroCard from '@/app/_components/newscomps/cards/siteIntroCard';
import FeaturedCard from '@/app/_components/newscomps/cards/featuredCard';
import ArticleCarousel from '@/app/_components/newscomps/articleCarousel';
import { ArticleInterface } from '@/app/_types/interfaces';

export default function Page() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const normalizedData = data.map((article: ArticleInterface) => ({
                    ...article,
                    isFeatured: article.isFeatured === '1',
                }));

                const featuredArticleExists = normalizedData.some(
                    (article: ArticleInterface) => article.isFeatured
                );

                // If no articles are explicitly marked as featured, set the first one as featured
                const finalArticles = normalizedData.map(
                    (article: ArticleInterface, index: number) => {
                        if (!featuredArticleExists && index === 0) {
                            return { ...article, isFeatured: true };
                        }
                        return article;
                    }
                );

                setArticles(finalArticles);
            } catch (err) {
                console.error('Failed to load articles:', err);
                setError('Failed to load articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    const featuredArticle = articles.find(article => article.isFeatured);
    const nonFeaturedArticles = articles.filter(article => !article.isFeatured);
    const hasNonFeaturedArticles = nonFeaturedArticles.length > 0;

    if (loading) {
        return <Text>Loading articles...</Text>;
    }

    if (error) {
        return <Text >{error}</Text>;
    }

    // Components for rendering the different grid layouts
    function FeaturedGrid() {
        return (
            <Container size="xl" p="sm">
                <Grid mt="sm">
                    <GridCol span={7} mah="80vh">
                        {featuredArticle ? (
                            <FeaturedCard article={featuredArticle} />
                        ) : (
                            <Text>No featured article available.</Text>
                        )}
                    </GridCol>
                    <GridCol span={5} mah="80vh">
                        {hasNonFeaturedArticles ? (
                            <ArticleCarousel articles={nonFeaturedArticles} />
                        ) : (
                            <Text>No other articles available.</Text>
                        )}
                    </GridCol>
                </Grid>
            </Container>
        );
    }

    function SmallFeaturedGrid() {
        return (
            <Container size="xl" p="sm">
                <Box mb="lg">
                    {featuredArticle ? (
                        <FeaturedCard article={featuredArticle} />
                    ) : (
                        <Text>No featured article available.</Text>
                    )}
                </Box>
                <Box>
                    {hasNonFeaturedArticles ? (
                        <ArticleCarousel articles={nonFeaturedArticles} height={260} />
                    ) : (
                        <Text>No other articles available.</Text>
                    )}
                </Box>
            </Container>
        );
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
                </Container>
                {isMobile ? <SmallFeaturedGrid /> : <FeaturedGrid />}
            </AppShellSection>
        </AppShell>
    );
}
