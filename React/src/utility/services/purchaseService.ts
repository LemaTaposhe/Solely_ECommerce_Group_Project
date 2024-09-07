import { IPurchase, IResponse, IStock } from '../../interfaces';
import { BaseService } from '../services/base';

export class PurchaseService {

    static getAll = async (): Promise<IPurchase[]> => {
        const result = await BaseService.createInstance().get('Purchase/Get');
        return result.data;
    }

    static getById = async (purchaseId: number): Promise<IPurchase> => {
        const result = await BaseService.createInstance().get(`Purchase/Get/${purchaseId}`);
        return result.data;
    }

    static add = async (purchase: IPurchase): Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Purchase', purchase);
        return result.data;
    }

    static update = async (purchaseId:number,purchase: IPurchase): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Purchase/${purchaseId}`, purchase);
        return result.data;
    }

    static updateQuantity = async (stockId: number, quantity: number): Promise<IStock> => {
        const result = await BaseService.createInstance().put(`Purchase/PutQuantity/${stockId}`, { quantity });
        return result.data;
    }

    static delete = async (purchaseId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete(`Purchase/${purchaseId}`);
        return result.data;
    }
}
