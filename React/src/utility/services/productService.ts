import { IProduct, IResponse } from '../../interfaces';
import { BaseService } from '../services/base';

export class ProductService {

    static getAll = async (): Promise<IProduct[]> => {
        const result = await BaseService.createInstance().get('Products/GetProduct');
        return result.data;
        
    }

    static getAllProduct = async (): Promise<IProduct[]> => {
        const result = await BaseService.createInstance().get('Products/Get');
        return result.data;
    }

    static getById = async (productId: number): Promise<IProduct> => {
        const result = await BaseService.createInstance().get(`Products/GetProducts/${productId}`);
        return result.data;
    }

    
    static add = async (formData: FormData): Promise<IResponse> => {
        const result = await BaseService.createInstanceForm().post('Products/Post', formData);
        return result.data;
    }

    // static add = async (product: IProduct): Promise<IResponse> => {
    //     const result = await BaseService.createInstance().post('Products/Post', product);
    //     return result.data;
    // }

    static update = async (productId:number,product: FormData): Promise<IResponse> => {
        const result = await BaseService.createInstanceForm().put(`Products/Put/${productId}`, product);
        return result.data;
    }

    static delete = async (productId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete(`Products/Delete/${productId}`);
        return result.data;
    }
}
