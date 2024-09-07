import { IDistrict } from './IDistrict'; 

export interface IDivision {
    divisionId: number;
    name: string;
    isActive?: boolean | null;
    districts?: IDistrict[] | null;
}
