'use client';

import React, {useState} from 'react';
// import React from "react";
import {Container, Text, Divider, Button, Box, Grid, AppShellSection, GridCol, AppShell} from '@mantine/core';

import SiteIntroCard from '@/app/_components/newscomps/cards/siteIntroCard';
import FeaturedCard from '@/app/_components/newscomps/cards/featuredCard';
import ArticleCarousel from "@/app/_components/newscomps/articleCarousel";

// Importing data from hardcoded .ts file
import newsData from '@/app/_components/newscomps/newsData'

// Import data from api
// import { fetchArticlesAsJson } from '@/app/_components/apicomps/articleFetch';

import {ArticleInterface} from "@/app/_types/interfaces";


export default function Page() {

    // For testing, admin is set to true / false
    const isAdmin = false;

    // Map data to articles that can be called
    const [articles, setArticles] = useState<ArticleInterface[]>(() => {
        return newsData.map((article, index) => ({
            ...article,
            featured: index === 0,
        }));
    });

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
                    {/*<Button component='a' href='/news/datapulltest' mt='sm' variant="light" fullWidth>*/}
                    {/*    Let us see*/}
                    {/*</Button>*/}
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
                                // Testing articleSubPage carousel
                                <ArticleCarousel/>
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
                <SiteIntroCard/>
            </Box>
            <Container size='xl' pt='lg'>
                {/*<Button component='a' href='/news/datapulltest' mt='sm' variant="light" fullWidth>*/}
                {/*    Let us see*/}
                {/*</Button>*/}
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
                            // Testing articleSubPage carousel
                            <ArticleCarousel/>
                        ) : (
                            <Text>Error: No articles exists</Text>
                        )
                        }
                    </GridCol>
                </Grid>

                {/*Option is just for admin*/}
                {/*<Button onClick={handleChangeFeaturedClick} mt="md">*/}
                {/*    Change Featured Article*/}
                {/*</Button>*/}
            </Container>

        </AppShellSection>
        </AppShell>
    );
}
