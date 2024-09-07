import { ICategory } from '../interfaces/iCategory'; 
import { CategoryService } from "../utility/services";
import { useEffect, useState } from 'react';

export const CategoryHook = (loadCategory: boolean) => {
    const [data, setData] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await CategoryService.getAll();
                setData([...result]);
            } catch (error: any) {
                setData([]);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (loadCategory) {
            fetchData();
        }
    }, [loadCategory]);

    return { data, loading, error, setData };
}
