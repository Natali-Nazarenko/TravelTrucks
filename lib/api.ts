import axios from 'axios';

import { Camper, CamperDetails } from '@/types/camper';
import { FilterParams, FiltersResponse } from '@/types/filters';
import { Review } from '@/types/review';
import { BookingCamperData } from '@/types/booking';

type ApiResponse = {
    campers: Camper[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
};

type BookingResponse = { message: string };

axios.defaults.baseURL = 'https://campers-api.goit.study';

export async function getCampers(page: number, filters: FilterParams = {}): Promise<ApiResponse> {
    const options = {
        method: 'GET',
        params: {
            page,
            perPage: 4,
            ...(filters.location && { location: filters.location }),
            ...(filters.form && { form: filters.form }),
            ...(filters.transmission && { transmission: filters.transmission }),
            ...(filters.engine && { engine: filters.engine }),
        },
    };

    const { data } = await axios.get<ApiResponse>('/campers', options);
    return data;
}

export async function getFilters(): Promise<FiltersResponse> {
    const { data } = await axios.get<FiltersResponse>('/campers/filters');
    return data;
}

export async function getCamperById(id: string): Promise<CamperDetails> {
    const { data } = await axios.get<CamperDetails>(`/campers/${id}`);
    return data;
}

export async function getReviewsbyId(id: string): Promise<Review[]> {
    const { data } = await axios.get<Review[]>(`/campers/${id}/reviews`);
    return data;
}

export async function postCamperBooking(
    camperId: string,
    user: BookingCamperData,
): Promise<BookingResponse> {
    const { data } = await axios.post<BookingResponse>(
        `/campers/${camperId}/booking-requests`,
        user,
    );
    return data;
}
