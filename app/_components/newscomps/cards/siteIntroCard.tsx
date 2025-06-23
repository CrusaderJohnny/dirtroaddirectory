import {Card, Title, BackgroundImage, Flex} from "@mantine/core";
import React from "react";


export default function SiteIntroCard() {
    return (
        <Card withBorder shadow='sm' p={0} h='60vh' w={'auto'} className='cursor-pointer'>
            <BackgroundImage
                src='https://images.unsplash.com/photo-1684775622591-cb57271f141e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                // alt='Source from Unsplash.com' (Mantine doesn't like an alt in the background image)
                h={'100%'}
            >
                <Flex justify="center" >
                    <Title order={2} pt='10%' c={'white'}>Explore Local Farmers Markets</Title>
                </Flex>
            </BackgroundImage>
        </Card>
    );
}