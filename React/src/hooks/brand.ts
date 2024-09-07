
// import { IBrand} from '../interface'
// import { BrandService } from "../utility/services"
// import {useEffect, useState} from 'react'

// export const BrandHook = (loadBrand: boolean) =>{
//     const [data, setData] = useState<IBrand[]>([]);
//     const [loading, setloading] = useState(false);
//     const [error, setError] = useState('');


//     useEffect (()=>{
//         const fetchData = async() =>{
//         try {
//             setloading(true);
//             const result = await BrandService.getAll();
//             setData([...result]);

//         }
//         catch(error:any) {
//             setData([]);
//                 setError(error.toString());
            
//         }
//         finally{
//             setloading(false);
//         }
//     }
//     if(loadBrand) {
//         fetchData();
//     }
//     }, [])
//     return {data, loading, error, setData}
// }


import { IBrand} from '../interfaces'
import { BrandService } from "../utility/services"
import {useEffect, useState} from 'react'

export const BrandHook = (loadBrand: boolean) =>{
    const [data, setData] = useState<IBrand[]>([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState('');


    useEffect (()=>{
        const fetchData = async() =>{
        try {
            setloading(true);
            const result = await BrandService.getAll();
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
    if(loadBrand) {
        fetchData();
    }
    }, [])
    return {data, loading, error, setData}
}




