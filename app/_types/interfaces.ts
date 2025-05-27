export interface MarketsInterface {
    id: string;
    image: string;
    label: string;
    description: string;
    content: string;
    link: string;
}

export interface VendorData {
    id: number;
    name: string;
    category: string;
    location: string;
    image: string;
    contact: string;
    markets: string[];
    description: string;
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

export interface SectionRef {
    current: HTMLElement | null;
}

export interface NavProps {
    onNavigate: HTMLElement | null;
    refs: SectionRef[];
}

export type Ref = {
    ref: HTMLElement;
}