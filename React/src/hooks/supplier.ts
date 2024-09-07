import { ISupplier} from '../interfaces/iSupplier'
import { SupplierService } from "../utility/services"
import {useEffect, useState} from 'react'


export const SupplierHook = (loadSupplier: boolean) =>{
    const [data, setData] = useState<ISupplier[]>([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState('');


    useEffect (()=>{
        const fetchData = async() =>{
        try {
            setloading(true);
            const result = await SupplierService.getAll();
            setData([...result]);

        }
        catch(error:any) {
            setData([]);
                setError(error.toString());
            
        }
        finally{
            setloading(false);
        }
    }
    if(loadSupplier) {
        fetchData();
    }
    }, [])
    return {data, loading, error, setData}
}