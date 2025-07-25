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
import marketsAPI from '@/app/_components/apicomps/marketsCRUD';
import { MarketsInterface } from '../_types/interfaces'; // Import your MarketsInterface

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

    const [allMarkets, setAllMarkets] = useState<MarketsInterface[]>([]); // State to store all fetched markets
    const [autocompleteData, setAutocompleteData] = useState<string[]>([]); // Data for Autocomplete
    const [searchInputValue, setSearchInputValue] = useState<string>(''); // State for search input value


    // Effect to fetch all markets on component mount
    useEffect(() => {
        const getMarkets = async () => {
            try {
                const data = await marketsAPI.getMarkets();
                setAllMarkets(data);
                // Initialize autocomplete data with all market names
                setAutocompleteData(data.map(market => market.label));
            } catch (error) {
                console.error("Failed to fetch markets:", error);
                // Handle error (e.g., show an error message to the user)
            }
        };
        getMarkets();
    }, []);


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

    const handleSearchSelect = (value: string) => {
        // Find the market object based on the selected name
        const selectedMarket = allMarkets.find(market => market.label === value);
        if (selectedMarket) {
            // Set the openMarketId to the ID of the selected market
            // Make sure the ID type matches what MarketAccordion expects (likely string)
            setOpenMarketId(selectedMarket.id);
            setSearchInputValue(value); // Keep the selected value in the search bar
            // Optionally, scroll the navbar into view if it's collapsed on mobile
            if (!desktopOpened) {
                toggleDesktop();
            }
            if (!mobileOpened) {
                toggleMobile();
            }
        }
    };



    //const regions = ['Calgary', 'Edmonton', 'Central', 'North East', 'North West', 'South'];
    // This is just for testing the search, have this reference the json later
    //const markets = ['Calgary Farmers Market', 'Cochrane Farmers Market', 'Dalhousie Farmers Market'];
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
                    <Button onClick={toggleDesktop} visibleFrom="sm" p={8}>
                        <IconChevronLeft style={iconStyle(desktopOpened)} />
                    </Button>
                    <Button onClick={toggleMobile} hiddenFrom="sm" p={8}>
                        <IconChevronLeft style={iconStyle(desktopOpened)} />
                    </Button>
                    <Autocomplete
                        placeholder="Search"
                        data={autocompleteData} // Use the filtered data
                        value={searchInputValue} // Bind value to state
                        onChange={setSearchInputValue} // Update state on change
                        onOptionSubmit={handleSearchSelect} // Handle selection
                    />
                    <Select
                        placeholder="Region"
                        data={regionsJsonData.map(region => ({ value: region.id, label: region.name }))}
                        value={selectedRegion} // Control selected value of the dropdown
                        onChange={handleChangeRegion} // Call handler when value changes
                        clearable
                    />
                </Group>
                
                <Center w={"80%"} mx={"auto"}>
                    <div>
                        
                    </div>
                    <div style={{width: '80%', height: '600px', flexGrow: 1, borderRadius: '8px', overflow: 'hidden', position: 'relative'}}>
                        <LoadingOverlay visible={visibleLoad} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} /> 
                        <MapComponent onMarkerClick={handleOpenMarket} center={mapCenter}/>
                    </div>
                </Center>
            </AppShell.Main>
        </AppShell>

    );
};
