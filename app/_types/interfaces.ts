export interface MarketsInterface {
    id: string;
    image: string;
    label: string;
    description: string;
    content: string;
    link: string;
}

export type MapCoords = {
    lat: number;
    lng: number;
}

export interface Poi {
    key: string;
    location: MapCoords;
}

export interface PoiMarkerProps {
    pois: Poi[];
}