import { IOrderAddress } from "./IOrderAddress";
import { IDeliveryMethod } from "./iDeliveryMethod";
import { IOrderItem } from "./iOrderItem";

export interface IOrder {
    orderId: number;
    customerEmail: string;
    orderDate: Date;
    subtotal: number;
    shippingAddress?: IOrderAddress;
    orderItems: IOrderItem[];
    status: OrderStatus;
    paymentIntentId?: string;
    orderNote?: string;
    deliveryMethod: string;
    total: number;
}

export enum OrderStatus {
    Pending = "Pending",
    Failed = "Failed",
    Confirmed = "Order Confirmed",
    Shipped = "Shipped",  
    Refunded = 'Refunded'
}


export enum PaymentStatus {
    Pending = "Pending",
    Paid = "Paid",
    Failed = "Failed",
    Refunded = "Refunded"
}
   