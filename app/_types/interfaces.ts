import {UserResource} from "@clerk/types";
import {User} from "@clerk/backend";
import {Roles} from "@/app/_types/globals";

export interface MarketsInterface {
  id: number;
  image: string;
  label: string;
  description: string;
  link: string;
  lat: number;
  lng: number;
  hours?: {
    dateRange: string;
    days: { day: string; time: string }[];
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  socials?: {
    facebook?: string;
    instagram?: string;
  };
  region?: string;
  events?: string[];
  vendors?: {
    id: number;
    name: string;
    category: string;
  }[];
}

export interface MarketGridProps {
    data: MarketsInterface[];
}

export interface AdminPostFormProps {
    currentUser: UserResource; //UserResource is a clerk type interface to hold all user type info
}

export interface MarketPostFormProps {
    marketName: string;
    userId: string;
}

export interface UserRoleActionsProps {
    userId: string;
    buttonType: string;
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
  email?: string;
  website?: string;
  markets: {
    id: string;
    label: string;
  }[];
  products?: string[];
  description: string;
}

export interface UserInfoInterface {
    id: number;
    username?: string;
    email?: string;
    created_at?: Date;
}

export type MapCoords = {
    lat: number;
    lng: number;
}

export interface Poi {
    key: number;
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
    summary:  string;
}

export interface ContactMessageInterface {
  id: number;
  name: string;
  email: string;
  subject?: string; 
  message: string;
  created_at: string;
}

export interface ImageUploaderProps {
    onImageUploadAction: (url: string | null) => void;
    initialImage?: string | null;
    signatureEndpoint: string;
    label?: string;
    uploadButtonText?: string;
    key?: number;
}


export interface AdminSearchProps {
    users: User[];
    searchType: string;
}

export interface UserPublicMetaData {
    role?: Roles;
    isMarket?: boolean;
    isVendor?: boolean;
    marketName?: string;
    vendorName?: string;
}

export interface SearchProps {
    searchName: string;
}

export interface AzureApiErrorResponse {
    error?: {
        code: string;
        message: string;
        details?: string;
    };
}