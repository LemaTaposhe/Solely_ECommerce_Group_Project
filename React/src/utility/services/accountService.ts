import { ILogin, IUser, IRegister,IResponse } from '../../interfaces';
import { BaseService } from '../services';

export class AccountService {
    static login = async (loginData: ILogin): Promise<IUser> => {
        const result = await BaseService.createInstance().post('Account/login', loginData);
        return result.data;
    }

    static registerCustomer = async (registerData: IRegister): Promise<IUser> => {
        const result = await BaseService.createInstance().post('Account/registerCustomer', registerData);
        return result.data;
    }

    static registerAdmin = async (registerData: IRegister): Promise<IUser> => {
        const result = await BaseService.createInstance().post('Account/registerAdmin', registerData);
        return result.data;
    }

    static checkEmailExists = async (email: string): Promise<boolean> => {
        const result = await BaseService.createInstance().get(`Account/emailexists?email=${email}`);
        return result.data;
    }
}
