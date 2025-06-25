/*
Written by Mace Howald 05-20-2025
Used Gemini to assist in debugging
Header image from "https://letspasta.com/wp-content/uploads/2022/08/Alberta-farming.jpg"
Used Mantine component library

*/

"use client"
import React from 'react';
import { AppShell, Button, Center, Select, Autocomplete, Group, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import MarketAccordion from "@/app/_components/marketaccordian/marketcomp";
import MapComponent from "@/app/_components/mapcomps/map";
import { useState, useEffect } from "react";
import NavMT from '../_components/navcomps/navmt';
import regions from '../_res/regions.json';

// Interface for region json
interface RegionData {
    id: string;
    name: string;
    center: {
        lat: number;
        lng: number;
    };
}

const regionsJsonData: RegionData[] = regions as RegionData[];

export default function App() {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [visibleLoad, setLoad] = useState(false);

    const [openMarketId, setOpenMarketId] = useState<number | null>(null);

    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(undefined);


    // effect runs whenever mapCenter changes from undefined to a coordinate.
    useEffect(() => {
        if (mapCenter) { // only run if mapCenter has a value
            const timer = setTimeout(() => {
                setMapCenter(undefined); // set to undefined to allow free panning
                setLoad(false); // turn off loading anim
            }, 100); // delay

            return () => clearTimeout(timer); // cleanup the timer if component unmounts or mapCenter changes again
        }
    }, [mapCenter]); // rerun this effect whenever mapCenter changes




    const handleOpenMarket = (marketId: number | null) => {
        console.log("Marker clicked with id:"+marketId)

        if (marketId == openMarketId) {
            setOpenMarketId(null);
        }
        else{
            setOpenMarketId(marketId);
        }

        
    };

    // handler for when a region is selected from the dropdown
    const handleChangeRegion = (value: string | null) => {
        setSelectedRegion(value); // Update the selected region ID state

        if (value) {
            // find selected region from json
            const selectedRegion = regionsJsonData.find(region => region.id === value);
            if (selectedRegion) {
                // update the mapCenter state with region coords
                setMapCenter(selectedRegion.center);
                setLoad(true); // turn on loading anim
            } else {
                // else clear the center
                setMapCenter(undefined);
            }
        } else {
            // if selection is cleared, clear the mapCenter
            setMapCenter(undefined);
        }
    };



    const regions = ['Calgary', 'Edmonton', 'Central', 'North East', 'North West', 'South'];
    // This is just for testing the search, have this reference the json later
    const markets = ['Calgary Farmers Market', 'Cochrane Farmers Market', 'Dalhousie Farmers Market'];
    //const farmHeader = require("../assets/Alberta-farming.jpg")


    // Style for the rotating icon
    const iconStyle = (opened: boolean) => ({
        transition: 'transform 150ms ease',
        transform: opened ? 'rotate(0deg)' : 'rotate(-180deg)',
    });


    return (
        <AppShell
            padding="md"
            navbar={{
                width: {base:'80%', sm:300},
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
                    <Button onClick={toggleDesktop} visibleFrom="sm" mb={'sm'} p={8}>
                        <IconChevronLeft style={iconStyle(desktopOpened)} />
                    </Button>
                    <Button onClick={toggleMobile} hiddenFrom="sm" p={8}>
                        <IconChevronLeft style={iconStyle(desktopOpened)} />
                    </Button>
                    <Autocomplete
                        placeholder="Search"
                        data={markets}
                    />
                    <Select
                        placeholder="Region"
                        data={regionsJsonData.map(region => ({ value: region.id, label: region.name }))}
                        value={selectedRegion} // Control selected value of the dropdown
                        onChange={handleChangeRegion} // Call handler when value changes
                        clearable
                    />
                </Group>
                

                <Center>
                    <div style={{width: '100%', height: '500px', flexGrow: 1, borderRadius: '8px', overflow: 'hidden', position: 'relative'}}>
                        <LoadingOverlay visible={visibleLoad} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <MapComponent onMarkerClick={handleOpenMarket} center={mapCenter}/>
                    </div>
                </Center>
            </AppShell.Main>
        </AppShell>

    );
};
