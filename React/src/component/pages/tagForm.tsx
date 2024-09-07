import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { ITag } from "../../interfaces";
import { TagService } from "../../utility/services";
import { Button } from "../controll/Button";
import { TextBox } from "../controll/TextBox";
import { CheckBox } from "../controll/CheckBox";

const initialState: ITag = {
    tagId: 0,
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

export const TagForm = () => {
    const classes = useStyle();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fileValues = values) => {
        let temp: any = { ...errors };
        if ('name' in fileValues) {
            if (fileValues.name) {
                if (!(/^[a-z A-Z\s]+$/).test(fileValues.name)) {
                    temp.name = "Tag Name should contain only alphabets.";
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
                updateTag(values);
                navigate("/");
            } else {
              addTag(values);
                navigate("/");
            }
        } else {
            console.log("Validation error!");
        }
    };

    const addTag = async (values: ITag) => {
        try {
            const result = await TagService.add(values);
            if (result.isSuccess) {
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const updateTag = async (values: ITag) => {
        try {
            const result = await TagService.update(values);
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

    const navigateToTagList = () => {
        navigate("/");
    };

    useEffect(() => {
        if (id != null && id !== undefined && parseInt(id) !== 0) {
            const fetchSelectedTag = async () => {
                try {
                    const tag = await TagService.getById(parseInt(id));
                    setValues({ ...tag });
                } catch (error: any) {
                    console.log(error);
                }
            };
            fetchSelectedTag();
        }
    }, [id, setValues]);

    return (
        <Grid container justifyContent="center" alignContent="center" direction="column" style={{ minHeight: 100 }}>
            {id != null && id !== undefined && parseInt(id) !== 0 ? <h2>Edit Tag</h2> : <h2>Add Tag</h2>}

            <form onSubmit={handleSubmit}>
                <TextBox
                    className={classes.field}
                    name="tagName"
                    label="Tag Name"
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
                    <Button text="Back to List" color="default" size="small" variant="contained" onClick={navigateToTagList} />
                </div>
            </form>
        </Grid>
    );
};
