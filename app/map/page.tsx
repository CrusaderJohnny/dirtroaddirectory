/*
Written by Mace Howald 05-20-2025
Used Gemini to assist in debugging
Header image from "https://letspasta.com/wp-content/uploads/2022/08/Alberta-farming.jpg"
Used Mantine component library

*/

"use client"
import React from 'react';
import { Text, AppShell, Button, Center, ScrollArea , AppShellMain, AppShellNavbar, AppShellHeader, BackgroundImage } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MarketAccordion from "@/app/_components/marketcomps/marketcomp";
import MapComponent from "@/app/_components/mapcomps/map";
import { useState } from "react";


export default function App() {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [openMarketId, setOpenMarketId] = useState<string | null>(null);

    const handleOpenMarket = (marketId: string | null) => {
        setOpenMarketId(marketId);
    };

    //const farmHeader = require("../assets/Alberta-farming.jpg")





    return (
        <AppShell
            padding="md"
            header={{ height: 100 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShellHeader>
                <BackgroundImage src="https://letspasta.com/wp-content/uploads/2022/08/Alberta-farming.jpg"
                                style={{ height: '100%' }} >
                    <Center style={{ height: '100%' }}>
                        <Text size='xl' c='white' fw='bold'>Example Header Here</Text>
                    </Center>
                </BackgroundImage>
            </AppShellHeader>
            <AppShellNavbar>
                <ScrollArea>
                    <MarketAccordion defaultOpenItemId={openMarketId} />
                </ScrollArea>
            </AppShellNavbar>
            <AppShellMain>
                <Button onClick={toggleDesktop} visibleFrom="sm" mb={'sm'}>
                    Toggle navbar
                </Button>
                <Button onClick={toggleMobile} hiddenFrom="sm">
                    Toggle navbar
                </Button>
                <Button onClick={() => handleOpenMarket("cfm") }>Open Test</Button>
                <Button onClick={() => handleOpenMarket(null) }>Close Test</Button>

                <Center>
                    <MapComponent/>
                </Center>



            </AppShellMain>
        </AppShell>

    );
};
