import axios from 'axios';

import { Camper } from '@/types/camper';

interface ApiResponse {
    campers: Camper[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

axios.defaults.baseURL = 'https://campers-api.goit.study';

export async function getCampers(page: number): Promise<ApiResponse> {
    const options = {
        method: 'GET',
        params: {
            page,
            perPage: 4,
        },
    };

    const { data } = await axios.get<ApiResponse>('/campers', options);
    return data;
}
