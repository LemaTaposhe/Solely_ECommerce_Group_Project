import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, FormControl, InputLabel, Select, Grid, Button, Typography, Box, Paper } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { ProductService, SupplierService, PurchaseService } from "../../utility/services";
import { IPurchase, ISupplier, IProduct } from "../../interfaces";

const initialState = {
    purchaseId: 0,
    purchaseDate: new Date().toISOString(),
    productId: '',
    productName: '',
    supplierId: '',
    supplierName: '',
    email: '',
    contactNo: '',
    address: '',
    purchaseQuantity: '',
    purchasePrice: ''
};

export const PurchaseForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [addNewSupplier, setAddNewSupplier] = useState(false);
    const navigate = useNavigate();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors };
        if ('productId' in fieldValues)
            temp.productId = fieldValues.productId ? "" : "This field is required.";
        if ('purchaseQuantity' in fieldValues)
            temp.purchaseQuantity = fieldValues.purchaseQuantity > 0 ? "" : "Quantity must be greater than zero.";
        if ('purchasePrice' in fieldValues)
            temp.purchasePrice = fieldValues.purchasePrice > 0 ? "" : "Price must be greater than zero.";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    const { values, onChange, setValues, errors, setErrors, resetForm } = useForm(initialState, false, validate, {});

    useEffect(() => {
        async function fetchData() {
            try {
                const [supplierData, productData] = await Promise.all([
                    SupplierService.getAll(),
                    ProductService.getAll() // Assuming this fetches all products
                ]);
                setSuppliers(supplierData);
                setProducts(productData);

                if (id) {
                    const purchase = await PurchaseService.getById(parseInt(id));
                    setValues(purchase);

                    if (purchase.supplierId) {
                        setAddNewSupplier(false);
                    } else {
                        setAddNewSupplier(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [id, setValues]);

    const handleSupplierChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const supplierId = e.target.value as number;
        if (supplierId === 0) {
            setAddNewSupplier(true);
            setValues({
                ...values,
                supplierId: '',
                supplierName: '',
                email: '',
                contactNo: '',
                address: ''
            });
        } else {
            setAddNewSupplier(false);
            const selected = suppliers.find(s => s.supplierId === supplierId);
            if (selected) {
                setValues((prevValues: IPurchase) => ({
                    ...prevValues,
                    supplierId: selected.supplierId.toString(),
                    supplierName: selected.supplierName,
                    email: selected.email,
                    contactNo: selected.contactNo,
                    address: selected.address
                }));
            }
        }
    };

    const handleProductChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const productId = e.target.value as number;
        const selectedProduct = products.find(p => p.productId === productId);
        if (selectedProduct) {
            setValues((prevValues: IPurchase) => ({
                ...prevValues,
                productId: selectedProduct.productId.toString(),
                productName: selectedProduct.name
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            const purchaseData: any = {
                purchaseDate: new Date().toISOString(),
                productId: values.productId,
                purchaseQuantity: values.purchaseQuantity,
                purchasePrice: values.purchasePrice
            };

            if (!values.supplierId) {
                purchaseData.supplier = {
                    supplierName: values.supplierName,
                    email: values.email,
                    contactNo: values.contactNo,
                    address: values.address,
                    isActive: true
                };
            } else {
                purchaseData.supplierId = values.supplierId;
            }

            try {
                if (id) {
                    await PurchaseService.update(Number(id), purchaseData);
                } else {
                    await PurchaseService.add(purchaseData);
                }
                navigate("/");
            } catch (error) {
                console.error("Error submitting purchase form:", error);
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom align="center">
                    {id ? "Edit Purchase" : "Add Purchase"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        {/* Product Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Product</InputLabel>
                                <Select
                                    name="productId"
                                    value={values.productId || ""}
                                    onChange={handleProductChange}
                                    label="Product"
                                >
                                    {products.map(product => (
                                        <MenuItem key={product.productId} value={product.productId}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Supplier Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Supplier</InputLabel>
                                <Select
                                    name="supplierId"
                                    value={values.supplierId || ""}
                                    onChange={handleSupplierChange}
                                    label="Supplier"
                                >
                                    <MenuItem value={0}>Add New Supplier</MenuItem>
                                    {suppliers.map(supplier => (
                                        <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
                                            {supplier.supplierName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Supplier Details (if adding new) */}
                        {addNewSupplier && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        name="supplierName"
                                        label="Supplier Name"
                                        value={values.supplierName}
                                        onChange={onChange}
                                        error={!!errors.supplierName}
                                        helperText={errors.supplierName}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={onChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="contactNo"
                                        label="Contact No"
                                        value={values.contactNo}
                                        onChange={onChange}
                                        error={!!errors.contactNo}
                                        helperText={errors.contactNo}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="address"
                                        label="Address"
                                        value={values.address}
                                        onChange={onChange}
                                        error={!!errors.address}
                                        helperText={errors.address}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Purchase Quantity */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="purchaseQuantity"
                                label="Purchase Quantity"
                                type="number"
                                value={values.purchaseQuantity}
                                onChange={onChange}
                                error={!!errors.purchaseQuantity}
                                helperText={errors.purchaseQuantity}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/* Purchase Price */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="purchasePrice"
                                label="Purchase Price"
                                type="number"
                                value={values.purchasePrice}
                                onChange={onChange}
                                error={!!errors.purchasePrice}
                                helperText={errors.purchasePrice}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Button type="submit" variant="contained" color="primary">
                                    {id ? "Update Purchase" : "Add Purchase"}
                                </Button>
                                <Button variant="outlined" color="default" onClick={() => resetForm()}>
                                    Reset
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};
