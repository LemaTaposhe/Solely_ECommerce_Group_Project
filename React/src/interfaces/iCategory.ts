import { IProduct } from "./iProduct";

export interface ICategory {
    categoryId: number;
    name?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    products?: IProduct[]; 
}
