import { IDeliveryMethod, IResponse } from '../../interfaces';  
import { BaseService } from '../services';

export class DeliveryService {

    static getAll = async (): Promise<IDeliveryMethod[]> => {
        const result = await BaseService.createInstance().get('Order/delivery-methods');
        return result.data;
    }
  }