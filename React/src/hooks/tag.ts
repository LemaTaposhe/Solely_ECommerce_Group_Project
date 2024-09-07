import { useState, useEffect } from 'react';
import { ITag } from '../interfaces/iTag';
import { TagService } from '../utility/services';

export const useTag = (loadTags: boolean) => {
    const [data, setData] = useState<ITag[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await TagService.getAll();
                setData([...result]);
            } catch (error: any) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (loadTags) {
            fetchData();
        }
    }, [loadTags]);

    return { data, loading, error, setData };
};
