import { Grid, makeStyles } from "@material-ui/core"
import { ISupplier } from "../../interfaces/iSupplier"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { Button } from "../controll/Button"
import { useForm } from "../../hooks"
import { TextBox } from "../controll/TextBox"
import { CheckBox } from "../controll/CheckBox"
import { SupplierService } from "../../utility/services"

const initialState: ISupplier = {
    supplierId: 0,
    supplierName: "",
    email: "",
    contactNo: "",
    address: "",
    isActive: false
}

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

export const SupplierForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors }
        if ('supplierName' in fieldValues) {
            if (fieldValues.supplierName) {
                if (!(/^[a-z A-Z]+$/).test(fieldValues.supplierName)) {
                    temp.supplierName = "Supplier Name should contein only alphabets not numbers or other special character."
                }
                else {
                    temp.supplierName = "";
                }
            }
            else {
                temp.supplierName = "This field is required."
            }
        }
        setErrors({
            ...temp
        })
        if (fieldValues === values) {
            if (temp.supplierName === "") {
                return true;
            }
        }
    }
    const { onChange, values, errors, setErrors, resetForm, setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (validate()) {
            if (id != null && id != undefined && parseInt(id) !== 0) {
                updateSupplier(values);
                navigate("/");
            }
            else {
                addSupplier(values);
                navigate("/");
            }
        }
        else {
            console.log("Validation error!!")
        }

    }
    const addSupplier = async (values: ISupplier) => {
        try {
            const result = await SupplierService.add(values);
            if (result.isSuccess == true) {
                navigate("/");
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const updateSupplier = async (values: ISupplier) => {
        try {
            const result = await SupplierService.update(values);
            if (result.isSuccess == true) {

                navigate("/");
            }
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const resetFormDetails = () => {
        resetForm();
    }

    const navigateToSupplierList = () => {
        navigate("/")
    }

    useEffect(() => {
        if (id != null && id != undefined && parseInt(id) !== 0) {
            const fetchSelectedSupplier = async () => {
                try {
                    const supplier = await SupplierService.getById(parseInt(id))
                    setValues({
                        ...supplier
                    })
                }
                catch (error: any) {
                    console.log(error)
                }
            }
            fetchSelectedSupplier();
        }
    }, [])
    return (
        <>
            <Grid container justifyContent="center" alignContent="center" direction="column" style={{ minHeight: 100 }}>
                {id != null && id != undefined && parseInt(id) !== 0 ? <h2>Edit Supplier</h2> : <h2>Add Supplier</h2>}
                <form onSubmit={handleSubmit}>
                    <TextBox
                        id="supplierName"
                        name="supplierName"
                        type="text"
                        label="Supplier Name"
                        onChange={onChange}
                        value={values.supplierName}
                        error={errors.supplierName}
                    /><br /><br /><br />
                    <TextBox
                        id="email"
                        name="email"
                        type="text"
                        label="Email Address"
                        onChange={onChange}
                        value={values.email}
                        error={errors.email}
                    /><br /><br /><br />
                    <TextBox
                        id="contactNo"
                        name="contactNo"
                        type="text"
                        label="Contact No"
                        onChange={onChange}
                        value={values.contactNo}
                        error={errors.contactNo}
                    /><br /><br /><br />
                    <TextBox
                        id="address"
                        name="address"
                        type="text"
                        label="Address"
                        onChange={onChange}
                        value={values.address}
                        error={errors.address}
                    /><br /><br /><br />
                    <CheckBox
                        id="isActive"
                        name="isActive"
                        type="text"
                        label="Active Status"
                        value={values.isActive}
                        onChange={onChange}
                        className={classes.field}
                    />
                    <Button type="submit" text="submit" color="primary" size="small" variant="contained" />
                    <Button type="reset" text="reset" color="inherit" size="small" variant="contained" onClick={resetFormDetails} />
                    <Button text="cancel" color="secondary" size="small" variant="contained" onClick={navigateToSupplierList} />

                </form>
            </Grid>
        </>
    )
}