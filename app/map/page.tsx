/*
Written by Mace Howald 05-20-2025
Used Gemini to assist in debugging
Header image from "https://letspasta.com/wp-content/uploads/2022/08/Alberta-farming.jpg"
Used Mantine component library

*/

"use client"
import React from 'react';
import { AppShell, Button, Center, Select, Autocomplete, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MarketAccordion from "@/app/_components/marketcomps/marketcomp";
import MapComponent from "@/app/_components/mapcomps/map";
import { useState } from "react";
import NavMT from '../_components/navcomps/navmt';



export default function App() {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [openMarketId, setOpenMarketId] = useState<string | null>(null);

    const handleOpenMarket = (marketId: string | null) => {
        console.log("Marker clicked with id:"+marketId)

        if (marketId == openMarketId) {
            setOpenMarketId(null);
        }
        else{
            setOpenMarketId(marketId);
        }

        
    };


    const reigons = ['Calgary', 'Edmonton', 'Central', 'North East', 'North West', 'South'];
    // This is just for testing the search, have this reference the json later
    const markets = ['Calgary Farmers Market', 'Cochrane Farmers Market', 'Dalhousie Farmers Market'];
    //const farmHeader = require("../assets/Alberta-farming.jpg")





    return (
        <AppShell
            padding="md"
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header component={NavMT}/>
            <AppShell.Navbar>
                <MarketAccordion defaultOpenItemId={openMarketId}/>
            </AppShell.Navbar>
            <AppShell.Main>
                <Group align='center' p={'sm'}>
                    <Button onClick={toggleDesktop} visibleFrom="sm" mb={'sm'}>
                        Toggle navbar
                    </Button>
                    <Button onClick={toggleMobile} hiddenFrom="sm">
                        Toggle navbar
                    </Button>
                    <Autocomplete
                        placeholder="Search"
                        data={markets}
                    />
                    <Select
                        placeholder="Region"
                        data={reigons}
                    />
                </Group>
                

                <Center>
                    <MapComponent onMarkerClick={handleOpenMarket}/>
                </Center>
            </AppShell.Main>
        </AppShell>

    );
};
