import { IUser, IAddress, IResponse } from '../../interfaces';
import { BaseService } from '../services';

export class UserService {
    static getCurrentUser = async (): Promise<IUser> => {
        const result = await BaseService.createInstance().get('Account');
        return result.data;
    }

    static getUserAddress = async (): Promise<IAddress> => {
        const result = await BaseService.createInstance().get('Account/address');
        return result.data;
    }

    static updateUserAddress = async (address: IAddress): Promise<IResponse> => {
        const result = await BaseService.createInstance().put('Account/address', address);
        return result.data;
    }
}
