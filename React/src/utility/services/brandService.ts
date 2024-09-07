import { IBrand, IResponse } from '../../interfaces'; 
import { BaseService } from '../services';


export class BrandService {
   
    static getAll = async() : Promise<IBrand[]> => {
        const result = await BaseService.createInstance().get('Brand')
        return result.data;
    }


    static getById = async(brandId: number) : Promise<IBrand> => {
        const result = await BaseService.createInstance().get('Brand/' + brandId)
        return result.data;
    }


    static add = async(brand: IBrand) : Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Brand', brand)
        return result.data;
    }

    static update = async(brand: IBrand) : Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Brand/${brand.brandId}`,brand)
        return result.data;
    }

    static delete = async(brandId:number) : Promise<IResponse> => {
        const result = await BaseService.createInstance().delete('Brand/'+ brandId)
        return result.data;
    }


}
