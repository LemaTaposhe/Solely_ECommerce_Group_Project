import { IProduct } from "./iProduct";
import { ISupplier } from "./iSupplier";

export interface IRequisition {
    requisitionId: number;
    supplierId?: number;
    supplier?: ISupplier;
    productId?: number;
    product?: IProduct;
    requisitionDate: Date;
    quantity: number;
}