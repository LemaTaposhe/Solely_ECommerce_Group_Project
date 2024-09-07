export interface IDeliveryMethod {
    deliveryMethodId: number;
    shortName?: string | null;
    description?: string;
    deliveryTime?: string;
    price: number;
    isActive?: boolean;
}
