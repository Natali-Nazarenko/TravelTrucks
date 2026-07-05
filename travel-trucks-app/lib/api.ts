import axios from 'axios';

import { Camper } from '@/types/camper';
import { FilterParams, FiltersResponse } from '@/types/filters';

interface ApiResponse {
    campers: Camper[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

axios.defaults.baseURL = 'https://campers-api.goit.study';

export async function getCampers(page: number, filters: FilterParams = {}): Promise<ApiResponse> {
    const options = {
        method: 'GET',
        params: {
            page,
            perPage: 4,
            ...(filters.location && { location: filters.location }),
            ...(filters.form && { location: filters.form }),
            ...(filters.transmission && { location: filters.transmission }),
            ...(filters.engine && { location: filters.engine }),
        },
    };

    const { data } = await axios.get<ApiResponse>('/campers', options);
    return data;
}

export async function getFilters(): Promise<FiltersResponse> {
    const { data } = await axios.get<FiltersResponse>('/campers/filters');
    return data;
}
