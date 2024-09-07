import { ICategory, IResponse } from '../../interfaces';  
import { BaseService } from '../services';

export class CategoryService {

    static getAll = async (): Promise<ICategory[]> => {
        const result = await BaseService.createInstance().get('Category/GetCategories');
        return result.data;
    }

    static getById = async (categoryId: number): Promise<ICategory> => {
        const result = await BaseService.createInstance().get('Category/GetCategory/' + categoryId);
        return result.data;
    }

    static add = async (category: ICategory): Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Category/InsertCategory', category);
        return result.data;
    }

    static update = async (category: ICategory): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Category/UpdateCategory/${category.categoryId}`, category);
        return result.data;
    }

    static delete = async (categoryId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete('Category/DeleteCategory/' + categoryId);
        return result.data;
    }
}
