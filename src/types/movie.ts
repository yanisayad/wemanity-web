import { Cinema } from './cinema'

export interface Movie {
    id?: number;
    name: string;
    start: string;
    end: string;
    cinema_id?: number;
}
