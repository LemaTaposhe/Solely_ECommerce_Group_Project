import { Grid, makeStyles } from "@material-ui/core";
import { IDistrict } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Button } from "../controll/Button";
import { useForm } from "../../hooks";
import { TextBox } from "../controll/TextBox";
import { CheckBox } from "../controll/CheckBox";
import { DistrictService } from "../../utility/services";

const initialState: IDistrict = {
    districtId: 0,
    divisionId: 0,
   
    name: "",
    type: "",
    location: "",
    isActive: false,
};

const useStyle = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
});

export const DistrictForm = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fileValues = values) => {
        let temp: any = { ...errors };
        if ('name' in fileValues) {
            if (fileValues.name) {
                if (!(/^[a-zA-Z]+$/).test(fileValues.name)) {
                    temp.name = "District Name should contain only alphabets not numbers";
                } else {
                    temp.name = "";
                }
            } else {
                temp.name = "This field is required";
            }
        }
        setErrors({
            ...temp
        });

        if (fileValues === values) {
            if (temp.name === "") {
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            if (id != null && id !== undefined && parseInt(id) !== 0) {
                updateDistrict(values);
                navigate("/");
            } else {
                addDistrict(values);
                navigate("/");
            }
        } else {
            console.log("Validation error!");
        }
        navigate("/");
    };

    const addDistrict = async (values: IDistrict) => {
        try {
            const result = await DistrictService.add(values);
            if (result.isSuccess === true) {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const updateDistrict = async (values: IDistrict) => {
        try {
            const result = await DistrictService.update(values);
            if (result.isSuccess === true) {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
        }
        navigate("/");
    };

    const resetFormDetails = () => {
        resetForm();
        navigate("/");
    };

    const navigateToDistrictList = () => {
        navigate("/");
    };

    useEffect(() => {
        if (id != null && id !== undefined && parseInt(id) !== 0) {
            const fetchSelectedDistrict = async () => {
                try {
                    const district = await DistrictService.getById(parseInt(id));
                    setValues({
                        ...district
                    });
                } catch (error: any) {
                    console.log(error);
                }
            };
            fetchSelectedDistrict();
        }
    }, [id, setValues]);

    return (
        <>
            <Grid container justifyContent="center" alignContent="center" direction="column" style={{ minHeight: 100 }}>
                {id != null && id !== undefined && parseInt(id) !== 0 ? <h2>Edit District</h2> : <h2>Add District</h2>}

                <form onSubmit={handleSubmit}>

                    <TextBox
                        id="name"
                        name="name"
                        type="text"
                        label="District Name"
                        onChange={onChange}
                        value={values.name}
                        error={errors.name}
                    />
                    <TextBox
                        id="divisionId"
                        name="divisionId"
                        type="number"
                        label="Division ID"
                        onChange={onChange}
                        value={values.divisionId}
                        error={errors.divisionId}
                    />
                   
                    <TextBox
                        id="type"
                        name="type"
                        type="text"
                        label="Type"
                        onChange={onChange}
                        value={values.type}
                        error={errors.type}
                    />
                    <TextBox
                        id="location"
                        name="location"
                        type="text"
                        label="Location"
                        onChange={onChange}
                        value={values.location}
                        error={errors.location}
                    />
                    <CheckBox
                        id="isActive"
                        name="isActive"
                        label="Active Status"
                        value={values.isActive}
                        onChange={onChange}
                        className={classes.field}
                    />
                    <Button type="submit" text="Submit" color="primary" size="small" variant="contained"></Button>
                    <Button type="reset" text="Reset" color="default" size="small" variant="contained" onClick={resetFormDetails}></Button>
                    <Button type="cancel" text="Cancel" color="default" size="small" variant="contained" onClick={navigateToDistrictList}></Button>

                </form>
            </Grid>
        </>
    );
};
