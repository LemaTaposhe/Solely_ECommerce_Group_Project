//import { IOrder,  IResponse } from '../../interfaces';
//import { BaseService } from '../services';

//export class OrderService {
//    static getAll = async (): Promise<IOrder[]> => {
//        const result = await BaseService.createInstance().get('Order');
//        return result.data;
//    }

//    static getById = async (orderId: number): Promise<IOrder> => {
//        const result = await BaseService.createInstance().get(`Order/${orderId}`);
//        return result.data;
//    }

//    //static create = async (order: IOrderCreate): Promise<IResponse> => {
//    //    const result = await BaseService.createInstance().post('Order', order);
//    //    return result.data;
//    //}

//    static update = async (orderId: number, order: IOrder): Promise<IResponse> => {
//        const result = await BaseService.createInstance().put(`Order/${orderId}`, order);
//        return result.data;
//    }

//    static delete = async (orderId: number): Promise<IResponse> => {
//        const result = await BaseService.createInstance().delete(`Order/${orderId}`);
//        return result.data;
//    }
//}

import axios from 'axios';
import { IOrder, OrderStatus } from '../../interfaces'; 
import { BaseService } from '../services';

export class OrderService {
    static async getOrders(): Promise<IOrder[]> {
        const response = await BaseService.createInstance().get('/order/GetAll');
        return response.data;
    }

    static async confirmOrder(orderId: number): Promise<void> {
        const response = await BaseService.createInstance().put(`/order/${orderId}/status`);
        return response.data;
    }
    static async getOrder(orderId: number): Promise<void> {
        const response = await BaseService.createInstance().get(`/order/${orderId}`);
        return response.data;
    }
}

