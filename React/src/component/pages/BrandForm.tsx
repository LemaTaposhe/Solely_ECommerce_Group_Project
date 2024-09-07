import React, { useEffect } from 'react';
import { Button } from '../controll/Button';
import { IBrand } from '../../interfaces'; 
import { BrandService } from '../../utility/services';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { CheckBox } from '../controll/CheckBox';
import { TextBox } from '../controll/TextBox';
import { useForm } from '../../hooks';

const initialState: IBrand = {
    brandId: 0,
    name: '',
    description: '',
    isActive: false,
};

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
    },
});

export const BrandForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors };

        if ('name' in fieldValues) {
            if (fieldValues.name) {
                if (!(/^[a-zA-Z]+$/).test(fieldValues.name)) {
                    temp.name = 'Brand Name should contain only alphabets, not numbers';
                } else {
                    temp.name = '';
                }
            } else {
                temp.name = 'This field is required';
            }
        }

        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            if (temp.name === '') {
                return true;
            }
        }
    };

    const { onChange, values, errors, setErrors, resetForm, setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    );

   

    useEffect(()=>{
        if(id !=null && id!== undefined && parseInt(id) !==0){
            const fetchSelectedBrand= async()=>{
                try{
                    const brand=await BrandService.getById( parseInt(id));
                    setValues({
                        ...brand
                    })

                }
                catch(error:any)
                {
                    console.log(error);
                }
            }
            fetchSelectedBrand();
        }

     }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validate()) {
            if (id != null && id !== undefined && parseInt(id) !== 0) {
                updateBrand(values);
            } else {
                addBrand(values);
            }
        } else {
            console.log('Validation Error!!');
        }
    };

    const addBrand = async (values: IBrand) => {
        try {
            const result = await BrandService.add(values);
            if (result.isSuccess) {
                navigate('/');
            }
        } catch (error) {
            console.log('Error adding brand:', error);
        }
    };

    const updateBrand = async (values: IBrand) => {
        try {
            const result = await BrandService.update(values);
            if (result.isSuccess) {
                navigate("/");
            }
        } catch (error) {
            console.log('Error updating brand:', error);
        }
    };

    const resetFormDetails = () => {
        resetForm();
    };

    const navigateToBrandList = () => {
        navigate("/");
    };

    return (
        <Grid container justifyContent='center' alignItems='center' direction='column' style={{ minHeight: 100 }}>
            {id != null && id !== undefined && parseInt(id) !== 0 ? <h2>Edit Brand</h2> : <h2>Add Brand</h2>}
            <form onSubmit={handleSubmit}>
                <TextBox
                    id="name"
                    name="name"
                    type="text"
                    label="Brand Name"
                    value={values.name}
                    onChange={onChange}
                    error={errors.name}
                />

                <TextBox
                    id="description"
                    name="description"
                    type="text"
                    label="Description"
                    value={values.description}
                    onChange={onChange}
                    className={classes.field} error={''}                />

                <CheckBox
                    id="isActive"
                    name="isActive"
                    label="Active Status"
                    value={values.isActive}
                    onChange={onChange}
                    className={classes.field}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                    text="Submit"
                />

                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    text="Reset"
                    onClick={resetFormDetails}
                />

                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    text="Cancel"
                    onClick={navigateToBrandList}
                />
            </form>
        </Grid>
    );
};
