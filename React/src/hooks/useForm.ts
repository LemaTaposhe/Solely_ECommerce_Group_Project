import { useState } from "react";


export const useForm = (initialState: any, validationOnChange: boolean, validate: any = null, initialStateError: any) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialStateError);

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validationOnChange) validate({ [name]: value })
    };

    const resetForm = () => {
        setValues(initialState);
        setErrors(initialState);
    }

    return {
        onChange, values, errors, setErrors, resetForm, setValues
    }
}