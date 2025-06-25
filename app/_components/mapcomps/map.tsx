/*
Written by Mace Howald 05-16-2025
Referenced: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#1
Used Gemini to assist in debugging
*/

"use client"
import React from 'react';
import { useState,useEffect } from 'react';
import {APIProvider, Map, Pin, AdvancedMarker} from '@vis.gl/react-google-maps';
import {useMapLocations} from './locations';
import {PoiMarkersArray} from "@/app/_types/interfaces";


// Define the props interface for PoiMarkers
interface PoiMarkersProps {
    pois: PoiMarkersArray;
    onMarkerClick: (marketId: number | null) => void;
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
    onMarkerClick: (marketId: number | null) => void;
    center?: { lat: number; lng: number };
}

function MapComponent({onMarkerClick, center}:MapComponentProps) {

    const locations = useMapLocations();

    // State to control the map's zoom level
    const [zoom, setZoom] = useState(10); // Initialize with default zoom

    // Get API key
    const Maps_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Check for API key
    if (!Maps_API_KEY) {
        console.error("Google Maps API Key is not defined. Please set (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) in the .env.local file. - Mace");
        return <div>Error: Google Maps API Key missing.</div>;
    }

    // default map center (Calgary)
    const initialMapCenterLocation: { lat: number; lng: number } = { lat: 51.05373355597089, lng: -114.07158095471553 };

    useEffect(() => {
    if (center) {
        setZoom(10); // Reset zoom to 10 when 'center' prop changes (i.e., map jumps)
    }
}, [center]);


    return (
        <APIProvider apiKey={Maps_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{width: '100%', height: '500px', flexGrow: 1}}>
                <Map
                    zoom={zoom}
                    mapId='DEMO_MAP_ID'
                    defaultCenter={initialMapCenterLocation}
                    center={center}
                    onZoomChanged={(ev) => setZoom(ev.detail.zoom)} // update zoom state when user manually zooms
                    >
                    <PoiMarkers pois={locations} onMarkerClick={onMarkerClick}/>
                </Map>
            </div>
        </APIProvider>
    );
}




export default MapComponent;