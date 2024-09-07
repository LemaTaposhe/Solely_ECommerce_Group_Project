import { IProduct } from "./iProduct";
export interface IBrand {
    brandId: number;
    name: string;
    description?: string | null;
    isActive?: boolean | null;
}