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
import articlesAPI from '@/app/_components/apicomps/articlesCRUD';

export default function Page() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await articlesAPI.getArticles();
                setArticles(() => {
                    if (data.length === 0) return [];

                    const hasFeatured = data.some(article => article.featured);

                    // If none are marked as featured, mark the first one
                    return data.map((article, index) => ({
                        ...article,
                        featured: hasFeatured ? article.featured : index === 0,
                    }));
                });

            } catch (err) {
                console.error('Failed to load articles:', err);
            }
        };

        loadArticles();
    }, []);

    const featuredArticle = articles.find(article => article.featured);
    const hasNonFeaturedArticles = articles.some(article => !article.featured);

    function FeaturedGrid({
                              featuredArticle,
                              articles,
                          }: {
        featuredArticle: ArticleInterface | undefined;
        articles: ArticleInterface[];
    }) {
        return (
            <Container size="xl" p="sm">
                <Grid mt="sm">
                    <GridCol span={7} mah="80vh">
                        {featuredArticle ? (
                            <FeaturedCard article={featuredArticle} />
                        ) : (
                            <Text>Error: No featured article exists</Text>
                        )}
                    </GridCol>

                    <GridCol span={5} mah="80vh">
                        {hasNonFeaturedArticles ? (
                            <ArticleCarousel articles={articles} />
                        ) : (
                            <Text>Error: No articles exist</Text>
                        )}
                    </GridCol>
                </Grid>
            </Container>
        );
    }

    function SmallFeaturedGrid({
                                   featuredArticle,
                                   articles,
                               }: {
        featuredArticle: ArticleInterface | undefined;
        articles: ArticleInterface[];
    }) {
        return (
            <Container size="xl" p="sm">
                <Box mb="lg">
                    {featuredArticle ? (
                        <FeaturedCard article={featuredArticle} />
                    ) : (
                        <Text>Error: No featured article exists</Text>
                    )}
                </Box>

                <Box>
                    {hasNonFeaturedArticles ? (
                        <ArticleCarousel articles={articles} height={260} />
                    ) : (
                        <Text>Error: No articles exist</Text>
                    )}
                </Box>
            </Container>
        );
    }

    return (
        <AppShell>
            <AppShellSection>
                <Box pt="md">
                    <SiteIntroCard />
                </Box>

                <Container size="xl" pt="lg">
                    <Button component="a" href="/aboutus" mt="sm" fullWidth>
                        Learn More About Us
                    </Button>
                    <Divider my="md" />
                </Container>

                {isMobile ? (
                    <SmallFeaturedGrid featuredArticle={featuredArticle} articles={articles} />
                ) : (
                    <FeaturedGrid featuredArticle={featuredArticle} articles={articles} />
                )}
            </AppShellSection>
        </AppShell>
    );
}
