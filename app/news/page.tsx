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
    AppShell
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import SiteIntroCard from '@/app/_components/newscomps/cards/siteIntroCard';
import FeaturedCard from '@/app/_components/newscomps/cards/featuredCard';
import ArticleCarousel from "@/app/_components/newscomps/articleCarousel";
// import { fetchArticlesAsJson } from '@/app/_components/apicomps/articlefetch';
import { ArticleInterface } from "@/app/_types/interfaces";
import articleData from "@/app/_res/articles.json";

export default function Page() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const getArticles = async () => {
            try {
                // OPTION A: API
                // const data = await fetchArticlesAsJson();

                // OPTION B: Hardcoded
                const data = articleData[0];

                setArticles(data.map((article, index) => ({
                    ...article,
                    featured: index === 0,
                })));
            } catch (err) {
                console.error("Failed to load articles:", err);
            }
        };
        void getArticles();
    }, []);

    const featuredArticle = articles.find(article => article.featured);
    const articleId2 = articles.find(article => article.id === 3);

    function FeaturedGrid({
                              featuredArticle,
                              articleId2,
                              articles,
                          }: {
        featuredArticle: ArticleInterface | undefined;
        articleId2: ArticleInterface | undefined;
        articles: ArticleInterface[];
    }) {
        return (
            <Container size='xl' p='sm'>
                <Grid mt='sm'>
                    <GridCol span={7} mah={'80vh'}>
                        {featuredArticle ? (
                            <FeaturedCard article={featuredArticle} />
                        ) : (
                            <Text>Error: No featured article exists</Text>
                        )}
                    </GridCol>

                    <GridCol span={5} mah={'80vh'}>
                        {articleId2 ? (
                            <ArticleCarousel articles={articles} />
                        ) : (
                            <Text>Error: No articles exists</Text>
                        )}
                    </GridCol>
                </Grid>
            </Container>
        );
    }

    function SmallFeaturedGrid({
                                   featuredArticle,
                                   articleId2,
                                   articles,
                               }: {
        featuredArticle: ArticleInterface | undefined;
        articleId2: ArticleInterface | undefined;
        articles: ArticleInterface[];
    }) {
        return (
            <Container size='xl' p='sm'>
                <Box mb="lg">
                    {featuredArticle ? (
                        <FeaturedCard article={featuredArticle} />
                    ) : (
                        <Text>Error: No featured article exists</Text>
                    )}
                </Box>

                <Box>
                    {articleId2 ? (
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
                <Box pt='md'>
                    <SiteIntroCard />
                </Box>

                <Container size='xl' pt='lg'>
                    <Button component="a" href="/aboutus" mt='sm' fullWidth>
                        Learn More About Us
                    </Button>
                    <Divider my='md' />
                </Container>

                {isMobile ? (
                    <SmallFeaturedGrid
                        featuredArticle={featuredArticle}
                        articleId2={articleId2}
                        articles={articles}
                    />
                ) : (
                    <FeaturedGrid
                        featuredArticle={featuredArticle}
                        articleId2={articleId2}
                        articles={articles}
                    />
                )}
            </AppShellSection>
        </AppShell>
    );
}
