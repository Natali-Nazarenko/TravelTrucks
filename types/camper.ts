export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: 'automatic' | 'manual';
    engine: 'diesel' | 'petrol' | 'hybrid' | 'electric';
    amenities: string[];
    createdAt: string;
    updatedAt: string;
    coverImage: string;
    totalReviews: number;
}

export interface ImageGallery {
    id: string;
    camperId: string;
    thumb: string;
    original: string;
    order: number;
}

export interface CamperDetails {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: 'automatic' | 'manual';
    engine: 'diesel' | 'petrol' | 'hybrid' | 'electric';
    amenities: string[];
    createdAt: string;
    updatedAt: string;
    gallery: ImageGallery[];
    totalReviews: number;
}
