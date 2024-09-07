
import { IDistrict } from '../interfaces'
import { DistrictService } from "../utility/services"
import { useEffect, useState } from 'react'

export const DistrictHook = (loadDistrict: boolean) => {
    const [data, setData] = useState<IDistrict[]>([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const result = await DistrictService.getAll();
                setData([...result]);

            }
            catch (error: any) {
                setData([]);
                setError(error.toString());

            }
            finally {
                setloading(false);
            }
        }
        if (loadDistrict) {
            fetchData();
        }
    }, [])
    return { data, loading, error, setData }
}




