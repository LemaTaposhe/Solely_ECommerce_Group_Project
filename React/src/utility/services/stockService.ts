import { IStock, IResponse } from '../../interfaces';
import { BaseService } from '../services/base';

export class StockService {

    // Fetch all stocks
    static getAll = async (): Promise<IStock[]> => {
        const result = await BaseService.createInstance().get('Stocks/GetStock');
        return result.data;
    }

    // Fetch a single stock by ID
    static getById = async (stockId: number): Promise<IStock> => {
        const result = await BaseService.createInstance().get(`Stocks/Get/${stockId}`);
        return result.data;
    }

    // Add a new stock
    static add = async (stock: IStock): Promise<IResponse> => {
        const result = await BaseService.createInstance().post('Stocks/Post', stock);
        return result.data;
    }

    // Update an existing stock by ID
    static update = async (stock: IStock): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Stocks/Put/${stock.stockId}`, stock);
        return result.data;
    }

    // Update the quantity of a stock
    static updateQuantity = async (stockId: number, quantity: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().put(`Stocks/PutQuantity/${stockId}`, { quantity });
        return result.data;
    }

    // Delete a stock by ID
    static delete = async (stockId: number): Promise<IResponse> => {
        const result = await BaseService.createInstance().delete(`Stocks/Delete/${stockId}`);
        return result.data;
    }
}
