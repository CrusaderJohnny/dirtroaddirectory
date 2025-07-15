'use client';

import React from 'react';
import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Box, Flex, Button } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

// get rid of hardcoded data
// import newsData from '@/app/_components/newscomps/newsData'; // Delete
import { ArticleInterface } from "@/app/_types/interfaces";
import NewsCardSmall from "@/app/_components/newscomps/cards/newsCardSmall";
// import {fetchArticlesAsJson} from "@/app/_components/apicomps/articlefetch";

export default function ArticleCarousel({ articles }: { articles: ArticleInterface[] }) {
    const autoplay = useRef(Autoplay({ delay: 4500 }));

    // Filter out the featured article
    const slides = articles
        .filter(article => !article.featured)
        .map(article => (
            <Carousel.Slide key={article.id}>
                <NewsCardSmall article={article} />
            </Carousel.Slide>
        ));

    return (
        <Card
            bg='gray.1'
            withBorder
            radius="md"
            shadow='sm'
            p="md"
            w='100%'
            h='100%'
            className="cursor-pointer"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
        >
            {/*<ScrollArea>*/}
            {/*Need to make the card Scrollable*/}

            <Text size="xl" fw={700} mb="md">Other News</Text>

            {/* This Flex container holds the Carousel and should occupy enough vertical space */}
            <Flex
                direction="column"
                justify="center"
                align="center"
                style={{
                    minHeight: '200px',
                    width: '100%',
                }}
            >
                <Box maw={'100%'} w={'auto'} h='100%' >
                    <Carousel
                        withIndicators // Removed indicators for now
                        height="60%"
                        slideSize="100%"
                        slideGap="md"
                        controlsOffset="md"
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={() => autoplay.current.play()}
                        emblaOptions={{
                            dragFree: false,
                        }}
                    >
                        {slides}
                    </Carousel>
                </Box>
            </Flex>

            {/* The final text */}
            <Flex
                w='100%'
                direction="row"
                align="center"
                justify='center'
                gap="md"
                wrap="wrap"
            >
                <Text size="lg" fw={700}>Want Your Story Featured?</Text>
                <Button component="a" href="/contact" mt='sm' fullWidth>
                    Contact Us
                </Button>
            </Flex>
            {/*</ScrollArea>*/}
        </Card>
    );
}