'use client';

import React, { useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Box, Button } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import { ArticleInterface } from "@/app/_types/interfaces";
import NewsCardSmall from "@/app/_components/newscomps/cards/newsCardSmall";

export default function ArticleCarousel( { articles, height } : {
    articles: ArticleInterface[];
    height?: number | string;
}) {
    const autoplay = useRef(Autoplay({ delay: 4500 }));

    const slides = articles.map(article => (
        <Carousel.Slide key={article.post_id}>
            <NewsCardSmall article={article} />
        </Carousel.Slide>
    ));

    // button hover state to change text
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            bg="green.1"
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
            <Text
                size="xl"
                fw={700}
                style={{
                    fontFamily: "Georgia, serif",
                    color: "#1f4d2e",
                    fontWeight: 800
                }}
            >Other News</Text>

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
                        styles={{
                            indicator: {
                                height: 4,
                                transition: 'width 250ms ease',
                                backgroundColor:
                                    '#1f4d2e'    // Bottom indicator color
                                },
                            control: {
                                color: 'black', // Arrow button color
                            },
                        }}
                    >
                        {slides}
                    </Carousel>
                ) : (
                    <Text size="sm" c="dimmed">No additional articles available.</Text>
                )}
            </Box>

            {/* Call-to-action Section */}
            <Box mt="xs">
                <Button
                    component="a"
                    href="/contact"
                    fullWidth
                    size="sm"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? "Contact Us!" : "Want your story Featured ?"}
                </Button>
            </Box>
        </Card>
    );
}
