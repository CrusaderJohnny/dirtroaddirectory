import {UserResource} from "@clerk/types";

export interface MarketsInterface {
    id: string;
    image: string;
    label: string;
    description: string;
    content: string;
    link: string;
    lat: number;
    lng: number;
}

export interface MarketOption {
    id: string;
    name: string;
}

export interface VendorOption {
    id: string;
    name: string;
}

export interface MarketGridProps {
    data: MarketsInterface[];
}

export interface AdminPostFormProps {
    user: UserResource; //UserResource is a clerk type interface to hold all user type info
}

export interface MarketPostFormProps {
    marketName: string;
    userId: string;
}

export interface UserRoleActionsProps {
    userId: string;
}

export interface VendorPostFormProps {
    userId: string;
    vendorName: string;
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

export type PoiMarkersArray = Poi[];


export interface SectionRef {
    ref: HTMLElement | null;
}

export interface MarketItem {
    id: string;
    image: string;
    label: string;
    description: string;
    content: string;
    link: string;
    lat: number;
    lng: number;
}

export interface ArticleInterface {
    id: number;
    title: string;
    date: string;
    content: string;
    imgLink: string;
    featured:  boolean;
    summery:  string;
}
