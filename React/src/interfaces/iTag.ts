import { IProduct } from "./iProduct";

export interface ITag {
    tagId: number;
    name?: string | null;
    description?: string | null;
    isActive?: boolean | null;
    products?: IProduct[]; 
}
