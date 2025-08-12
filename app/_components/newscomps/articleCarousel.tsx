'use client';

import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Box, Button } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import { ArticleInterface } from "@/app/_types/interfaces";
import NewsCardSmall from "@/app/_components/newscomps/cards/newsCardSmall";

export default function ArticleCarousel({
                                            articles,
                                            height,
                                        }: {
    articles: ArticleInterface[];
    height?: number | string;
}) {
    const autoplay = useRef(Autoplay({ delay: 4500 }));

    // Filter out featured article(s)
    const nonFeaturedArticles = articles.filter(article => !article.featured);

    // Create slides from remaining articles
    const slides = nonFeaturedArticles.map(article => (
        <Carousel.Slide key={article.id}>
            <NewsCardSmall article={article} />
        </Carousel.Slide>
    ));

    return (
        <Card
            bg="gray.1"
            withBorder
            radius="md"
            shadow="sm"
            p="md"
            w="100%"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '1rem',
            }}
        >
            <Text size="xl" fw={700}>Other News</Text>

            {/* Carousel Section */}
            <Box style={{ width: '100%' }}>
                {slides.length > 0 ? (
                    <Carousel
                        withIndicators
                        height={height ?? 400}
                        slideSize="100%"
                        slideGap="md"
                        controlsOffset="md"
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={() => autoplay.current.play()}
                        emblaOptions={{ dragFree: false }}
                    >
                        {slides}
                    </Carousel>
                ) : (
                    <Text size="sm" c="dimmed">No additional articles available.</Text>
                )}
            </Box>

            {/* Call-to-action Section */}
            <Box mt="xs">
                <Text size="lg" fw={700} ta="center" mb="xs">
                    Want Your Story Featured?
                </Text>
                <Button component="a" href="/contact" fullWidth size="sm">
                    Contact Us
                </Button>
            </Box>
        </Card>
    );
}
