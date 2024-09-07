import {IResponse } from '../../interfaces'
import { ISupplier } from '../../interfaces/iSupplier'
import { BaseService} from '../services/base'

export class SupplierService {
   
    static getAll = async() : Promise<ISupplier[]> => {
        const result = await BaseService.createInstance().get('Supplier/GetSuppliers')
        return result.data;
    }


    static getById = async(supplierId: number) : Promise<ISupplier> => {
        const result = await BaseService.createInstance().get('Supplier/GetSupplier/' + supplierId)
        return result.data;
    }
    


    static add = async(supplier: ISupplier) : Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Supplier/InsertSupplier', supplier)
        return result.data;
    }

    static update = async(supplier: ISupplier) : Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Supplier/UpdateSupplier/${supplier.supplierId}`, supplier)
        return result.data;
    }

    static delete = async(supplierId:number) : Promise<IResponse> => {
        const result = await BaseService.createInstance().delete('Supplier/DeleteSupplier/'+ supplierId)
        return result.data;
    }


}