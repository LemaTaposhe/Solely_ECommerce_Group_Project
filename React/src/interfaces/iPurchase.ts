import { IProduct } from "./iProduct";
import { ISupplier } from "./iSupplier";

export interface IPurchase {
    purchaseId: number;
    purchaseDate: Date;
    productId: number;
    product?: IProduct;
    supplierId?: number | null;
    supplier?: ISupplier | null;
    purchaseQuantity: number;
    purchasePrice: number;
}
