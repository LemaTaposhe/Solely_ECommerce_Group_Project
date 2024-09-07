import { useState, useEffect } from 'react';
import { IStock } from '../interfaces';
import { StockService } from '../utility/services/stockService';

export const useStock = (loadStock: boolean) => {
    const [data, setData] = useState<IStock[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await StockService.getAll();
                setData(result);
            } catch (error: any) {
                setError(error.toString());
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        if (loadStock) {
            fetchData();
        }
    }, [loadStock]);

    const addStock = async (stock: IStock) => {
        try {
            setLoading(true);
            const result = await StockService.add(stock);
            setData([...data, stock]);
            return result;
        } catch (error: any) {
            setError(error.toString());
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateStock = async (stockId: number, stock: IStock) => {
        try {
            setLoading(true);
            const result = await StockService.update(stock);
            setData(data.map(s => s.stockId === stockId ? stock : s));
            return result;
        } catch (error: any) {
            setError(error.toString());
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteStock = async (stockId: number) => {
        try {
            setLoading(true);
            const result = await StockService.delete(stockId);
            setData(data.filter(s => s.stockId !== stockId));
            return result;
        } catch (error: any) {
            setError(error.toString());
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateStockQuantity = async (stockId: number, quantity: number) => {
        try {
            setLoading(true);
            const result = await StockService.updateQuantity(stockId, quantity);
            const updatedStock = data.find(s => s.stockId === stockId);
            if (updatedStock) {
                updatedStock.quantity += quantity;
                setData([...data]);
            }
            return result;
        } catch (error: any) {
            setError(error.toString());
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, addStock, updateStock, deleteStock, updateStockQuantity, setData };
};
