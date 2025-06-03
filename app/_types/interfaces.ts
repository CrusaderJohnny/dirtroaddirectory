export interface MarketsInterface {
    id: string;
    image: string;
    label: string;
    description: string;
    content: string;
    link: string;
}

export interface VendorsInterface {
    id: number;
    name: string;
    category: string;
    location: string;
    image: string;
    contact: string;
    markets: string[];
    description: string;
}

export interface UserInfoInterface {
    user: {
        primaryEmail: string;
        firstName: string;
        fullName: string;
        primaryPhone: string;
        verifiedEmail: boolean;
        verifiedPhone: boolean;
        hasPicture: boolean;
        profilePicture: string;
        createdAt: Date;
    }
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
    ref: HTMLElement | null;
}
