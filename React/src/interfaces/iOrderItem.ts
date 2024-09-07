import { IProduct } from "./iProduct";

export interface IOrderItem {
    orderItemId: number;
    productId: number;
    product: IProduct;
    productPrice: number;
    quantity: number;
}