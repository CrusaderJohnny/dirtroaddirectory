/*
Written by Mace Howald 05-16-2025
Referenced: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#1
Used Gemini to assist in debugging
*/

"use client"
import React from 'react';
import {APIProvider, Map, Pin, AdvancedMarker} from '@vis.gl/react-google-maps';
import {MapLocations} from './locations';
import {PoiMarkersArray} from "@/app/_types/interfaces";
import { Button } from '@mantine/core';


const locations = MapLocations;

// Define the props interface for PoiMarkers
interface PoiMarkersProps {
    pois: PoiMarkersArray;
    onMarkerClick: (marketId: string | null) => void;
}

const PoiMarkers = ({ pois, onMarkerClick }: PoiMarkersProps) => {
    return (
        <>
            {pois.map( (poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    onClick={() => onMarkerClick(poi.key)}>
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

// Define the props interface for MapComponent
interface MapComponentProps {
    onMarkerClick: (marketId: string | null) => void;
}

function MapComponent({onMarkerClick}:MapComponentProps) {

    // Get API key
    const Maps_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Check for API key
    if (!Maps_API_KEY) {
        console.error("Google Maps API Key is not defined. Please set (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) in the .env.local file. - Mace");
        return <div>Error: Google Maps API Key missing.</div>;
    }

    return (
        <APIProvider apiKey={Maps_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{width: '100%', height: '500px', flexGrow: 1}}>
                <Map
                    defaultZoom={10}
                    mapId='DEMO_MAP_ID'
                    defaultCenter={ { lat: 51.05373355597089, lng: -114.07158095471553 } }>
                    <PoiMarkers pois={locations} onMarkerClick={onMarkerClick}/>
                </Map>
            </div>
        </APIProvider>
    );
};




export default MapComponent;