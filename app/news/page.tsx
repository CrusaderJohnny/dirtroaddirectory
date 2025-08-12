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

                    const hasFeatured = data.some(article => article.isFeatured);

                    // This is the updated logic
                    // If none are marked as featured, mark the first one by setting its isFeatured property to true.
                    return data.map((article, index) => {
                        return {
                            ...article,
                            isFeatured: hasFeatured ? article.isFeatured : index === 0,
                        };
                    });
                });
            } catch (err) {
                console.error('Failed to load articles:', err);
                // Optionally handle the error state, e.g., set articles to an empty array
                setArticles([]);
            }
        };

        loadArticles();
    }, []);

    // The rest of the component is fine because it relies on the now-correct `isFeatured` flag.
    const featuredArticle = articles.find(article => article.isFeatured);
    const hasNonFeaturedArticles = articles.some(article => !article.isFeatured);

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
                            // This error message is now a fallback for a true error state, not a logic bug
                            <Text>Error: No featured article exists</Text>
                        )}
                    </GridCol>

                    <GridCol span={5} mah="80vh">
                        {hasNonFeaturedArticles ? (
                            <ArticleCarousel articles={articles.filter(article => !article.isFeatured)} />
                        ) : (
                            <Text>Error: No non-featured articles exist</Text>
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
                        <ArticleCarousel articles={articles.filter(article => !article.isFeatured)} height={260} />
                    ) : (
                        <Text>Error: No non-featured articles exist</Text>
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