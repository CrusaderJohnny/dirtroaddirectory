/*
Written by Mace Howald 06-03-2025
Referenced: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#1
Maps the markets from markets.json to the POIs array for the google maps api
*/
import {Poi} from "@/app/_types/interfaces";
import data from "../../_res/markets.json";
import {MarketItem} from "@/app/_types/interfaces";
const marketList: MarketItem[] = data;

export const MapLocations : Poi[] = [
// Create empty array of Points of interest (POI)
];

// Add a POI for each item in the market list
const items = marketList.map((item) => (
    MapLocations.push({key: item.id, location: { lat: item.lat, lng: item.lng  }})
))