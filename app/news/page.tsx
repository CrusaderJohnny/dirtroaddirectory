'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import {Container, Text, Divider, Button, Box, Grid, AppShellSection, GridCol, AppShell} from '@mantine/core';
// import {Center} from "@mantine/core";

import SiteIntroCard from '@/app/_components/newscomps/cards/siteIntroCard';
import FeaturedCard from '@/app/_components/newscomps/cards/featuredCard';
import ArticleCarousel from "@/app/_components/newscomps/articleCarousel";

// Import article API fetch and interface
// import { fetchArticlesAsJson } from '@/app/_components/apicomps/articlefetch';
import {ArticleInterface} from "@/app/_types/interfaces";

// Import hardcoded data for demo
import articleData from "@/app/_res/articles.json";

export default function Page() {

    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const isAdmin = false;

    // Fetch article data on mount
    useEffect(() => {
        const getArticles = async () => {
            try {
                // OPTION A: USE API
                // const data = await fetchArticlesAsJson();

                // OPTION B: USE HARDCODED DATA
                const data = articleData[0]; // unwrap from nested array

                console.log("Loaded Articles: ", data);
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

    // Find articleSubPage that is set to featured in test data
    const featuredArticle = articles.find(article => article.featured);

    // Function for changing featured articleSubPage
    const handleChangeFeaturedClick = () => {
        const input = prompt("Enter ID of featured articleSubPage.");
        if (input === null || input.trim() === "") {
            // Process canceled
            return;
        }

        const id = parseInt(input.trim(), 10);
        if (isNaN(id)) {
            alert("Invalid ID");
            return;
        }
        handleFeatureArticle(id);
    };

    const handleFeatureArticle = (idToFeature: number) => {
        setArticles(prevArticles => {
            // Check if the idToFeature actually exists in the articles list
            const articleExists = prevArticles.some(article => article.id === idToFeature);
            if (!articleExists) {
                alert(`Article with ID ${idToFeature} not found.`);
                return prevArticles; // Return previous state if ID is invalid
            }

            return prevArticles.map(article => ({
                ...article,
                featured: article.id === idToFeature,
            }));
        });
    };

    // for testing delete later
    const articleId2 = articles.find(article => article.id === 3);


    if (isAdmin) {
        return (
            // The entire page is a "Section" rendered within "Main" of parent page.tsx
            <AppShell>
            <AppShellSection>

                {/*This container is the for the intro to website section*/}
                <Box pt='md'>
                    <SiteIntroCard/>
                </Box>
                <Container size='xl' pt='lg'>
                    <Button component="a" href="/aboutus" mt='sm' fullWidth>
                        Learn More About Us
                    </Button>
                    <Divider my='md'/>
                </Container>

                <Container size='xl' p='sm' >
                    <Grid mt='sm'>
                        <GridCol span={7} mah={'80vh'} >
                            {featuredArticle ? (
                                <FeaturedCard article={featuredArticle} />
                            ) : (
                                <Text>Error: No featured article exists</Text>
                            )
                            }
                        </GridCol>

                        <GridCol span={5} mah={'80vh'}>
                            {articleId2 ? (
                                <ArticleCarousel articles={articles} />
                            ) : (
                                <Text>Error: No articles exists</Text>
                            )
                            }
                        </GridCol>
                    </Grid>

                    {/*Option is just for admin*/}
                    <Button onClick={handleChangeFeaturedClick} mt="md">
                        Change Featured Article
                    </Button>
                </Container>

            </AppShellSection>
            </AppShell>
        );
    }
    // If user who is not admin is logged in
    return (
        <AppShell>
        <AppShellSection>

            {/*This container is the for the intro to website section*/}
            <Box pt='md'>
                {/*<Center component={'a'} href={'/fakeAdmin'}>*/}
                {/*    Go to fake page*/}
                {/*</Center>*/}
                <SiteIntroCard/>
            </Box>
            <Container size='xl' pt='lg'>

                <Button component="a" href="/aboutus" mt='sm' fullWidth>
                    Learn More About Us
                </Button>
                <Divider my='md'/>
            </Container>

            <Container size='xl' p='sm' >
                <Grid mt='sm'>
                    <GridCol span={7} mah={'80vh'} >
                        {featuredArticle ? (
                            <FeaturedCard article={featuredArticle} />
                        ) : (
                            <Text>Error: No featured article exists</Text>
                        )
                        }
                    </GridCol>

                    <GridCol span={5} mah={'80vh'}>
                        {articleId2 ? (
                            <ArticleCarousel articles={articles} />
                        ) : (
                            <Text>Error: No articles exists</Text>
                        )
                        }
                    </GridCol>
                </Grid>
            </Container>
        </AppShellSection>
        </AppShell>
    );
}
