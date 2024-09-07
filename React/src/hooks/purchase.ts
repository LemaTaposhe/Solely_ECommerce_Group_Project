import { IPurchase } from '../interfaces';
import { PurchaseService } from '../utility/services/purchaseService'
import { useEffect, useState } from 'react';

export const usePurchase = (loadPurchase: boolean) => {
    const [data, setData] = useState<IPurchase[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await PurchaseService.getAll();
                setData([...result]);
            } catch (error: any) {
                setData([]);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (loadPurchase) {
            fetchData();
        }
    }, [loadPurchase]);

    return { data, loading, error, setData };
};
