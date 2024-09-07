import { IDistrict, IResponse } from '../../interfaces'
import { BaseService } from '../services/base'




export class DistrictService {

    static getAll = async (): Promise<IDistrict[]> => {
        const result = await BaseService.createInstance().get('District')
        return result.data;
    }


    static getById = async (districtId: number): Promise<IDistrict> => {
        const result = await BaseService.createInstance().get('District/GetDistrict/' + districtId)
        return result.data;
    }


    static add = async (district: IDistrict): Promise<IResponse> => {
        const result = await BaseService.createInstance().post('District/SaveDistrict', district)
        return result.data;
    }

    static update = async (district: IDistrict): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`District/UpdateDistrict/${district.districtId}`, district)
        return result.data;
    }

    static delete = async (districtId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete('District/DeleteDistrict/' + districtId)
        return result.data;
    }


}