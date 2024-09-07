import { IOrder } from ".";

export interface IInvoice {
    invoiceId: number;
    invoiceDate: Date;
    orderId: number;
    order?: IOrder; 
    totalPrice: number;
}