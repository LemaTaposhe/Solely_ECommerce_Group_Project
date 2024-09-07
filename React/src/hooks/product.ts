import { useState, useEffect } from 'react';
import { IProduct } from '../interfaces/iProduct';
import { ProductService } from '../utility/services';

export const useProduct = (loadProducts: boolean) => {
    const [data, setData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await ProductService.getAll();
                setData([...result]);
            } catch (error: any) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (loadProducts) {
            fetchData();
        }
    }, [loadProducts]);

    return { data, loading, error, setData };
};
