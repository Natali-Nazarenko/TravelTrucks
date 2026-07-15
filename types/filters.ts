export interface FilterParams {
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
}

export interface FiltersResponse {
    forms: string[];
    transmissions: string[];
    engines: string[];
}
