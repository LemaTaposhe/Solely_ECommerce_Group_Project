import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { ICategory } from "../../interfaces";
import { CategoryService } from "../../utility/services";
import { Button } from "../controll/Button";
import { TextBox } from "../controll/TextBox";
import { CheckBox } from "../controll/CheckBox";

const initialState: ICategory = {
    categoryId: 0,
    name: "",
    description: "",
    isActive: true,
    products: []
};

const useStyle = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
    },
});

export const CategoryForm = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fileValues = values) => {
        let temp: any = { ...errors };
        if ('name' in fileValues) {
            if (fileValues.name) {
                if (!(/^[a-zA-Z\s]+$/).test(fileValues.name)) {
                    temp.name = "Category Name should contain only alphabets.";
                } else {
                    temp.name = "";
                }
            } else {
                temp.name = "This field is required.";
            }
        }
        setErrors({ ...temp });
        if (fileValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    };

    const { onChange, values, errors, setErrors, resetForm, setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (id != null && id !== undefined && parseInt(id) !== 0) {
                updateCategory(values);
                navigate("/");
            } else {
                addCategory(values);
                navigate("/");
            }
        } else {
            console.log("Validation error!");
        }
    };

    const addCategory = async (values: ICategory) => {
        try {
            const result = await CategoryService.add(values);
            if (result.isSuccess) {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const updateCategory = async (values: ICategory) => {
        try {
            const result = await CategoryService.update(values);
            if (result.isSuccess) {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const resetFormDetails = () => {
        resetForm();
        navigate("/");
    };

    const navigateToCategoryList = () => {
        navigate("/");
    };

    useEffect(() => {
        if (id != null && id !== undefined && parseInt(id) !== 0) {
            const fetchSelectedCategory = async () => {
                try {
                    const category = await CategoryService.getById(parseInt(id));
                    setValues({ ...category });
                } catch (error: any) {
                    console.log(error);
                }
            };
            fetchSelectedCategory();
        }
    }, [id, setValues]);

    return (
        <Grid container justifyContent="center" alignContent="center" direction="column" style={{ minHeight: 100 }}>
            {id != null && id !== undefined && parseInt(id) !== 0 ? <h2>Edit Category</h2> : <h2>Add Category</h2>}

            <form onSubmit={handleSubmit}>
                <TextBox
                    className={classes.field}
                    name="categoryName"
                    label="Category Name"
                    value={values.name}
                    onChange={onChange}
                    error={errors.name} id={""} type={""}                />

                <TextBox
                    className={classes.field}
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={onChange}
                    error={errors.description} id={""} type={""}                />

                <CheckBox
                    name="isActive"
                    label="Is Active"
                    value={values.isActive}
                    onChange={onChange} id={""} className={""}                />

                <div>
                    <Button text="Submit" color="primary" size="small" variant="contained" type="submit" />
                    <Button text="Reset" color="default" size="small" variant="contained" onClick={resetFormDetails} />
                    <Button text="Back to List" color="default" size="small" variant="contained" onClick={navigateToCategoryList} />
                </div>
            </form>
        </Grid>
    );
};
