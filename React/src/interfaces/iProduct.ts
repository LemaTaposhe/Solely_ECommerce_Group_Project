////import { ReactNode } from "react";
////import { IProductAttribute } from "./IProductAttribute";
////import { IBrand } from "./iBrand";
////import { ICategory } from "./iCategory";
////import { ITag } from "./iTag";

//import { IProductAttribute } from ".";

////export interface IProduct {
////    brandName: ReactNode;
////    productId: number;
////    name?: string | null;
////    description?: string | null;
////    price: number;
////    normalizedName?: string | null;
////    thumbnailImage?: string | null;
////    image?: File | null;
////    categoryId?: number | null;
////    category?: ICategory | null;
////    productAttributeId?: number | null;
////    productAttribute?: IProductAttribute | null;
////    tagId?: number | null;
////    tag?: ITag | null;
////    brandId?: number | null;
////    brand?: IBrand | null;
////    isActive?: boolean | null;
////    createdOn: Date;
////}

//export interface IProduct {
//    productId: number;
//    name: string;
//    description: string;
//    price: number;
//    isActive: boolean;
//    thumbnailImage: string;
//    normalizedName: string;
//    categoryId: number;
//    categoryName: string;
//    brandId: number;
//    brandName: string;
//    tagId: number;
//    productAttributeId: IProductAttribute | null;
//    createdOn: Date;
//}

// iProduct.ts
import { ITag } from "./iTag";
import { ICategory } from "./iCategory";
import { IBrand } from "./iBrand";
//import { IBrand } from "./iBrand";
/*import { IProductAttribute } from "./IProductAttribute";*/

export interface IProduct {
    productId: number;
    name?: string | null;
    description?: string | null;
    price: number;
    normalizedName?: string | null;
    thumbnailImage?: string | null;
    image?: File | null;
    categoryId?: number | null;
    category?: ICategory ;   
    tagId?: number | null;
    tag?: ITag | null;
    brandId?: number | null ;
    brand?: IBrand |null ;
    quantity?: number|null;
    isActive?: boolean | null;
    createdOn: Date;
}

