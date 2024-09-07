import { IProduct } from "./iProduct";

export interface IStock {
    stockId: number;
    lastPurchaseDate: Date;
    productId?: number;
    product?: IProduct;
    quantity: number;
}