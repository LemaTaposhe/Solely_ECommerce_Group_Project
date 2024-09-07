import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, FormControl, InputLabel, Select, Grid, Button, FormControlLabel, Checkbox, Typography, Box, Paper } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { IProduct, IBrand, ICategory, ITag } from "../../interfaces";
import { ProductService, CategoryService, BrandService, TagService } from "../../utility/services";

const initialState: IProduct = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    normalizedName: '',
    thumbnailImage: '',
    image: null,
    categoryId: null,
    brandId: null,
    tagId: null,
    isActive: true,
    createdOn: new Date(),
};

export const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const validate = (fieldValues = values) => {
        let temp: any = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required.";
        if ('price' in fieldValues)
            temp.price = fieldValues.price > 0 ? "" : "Price must be greater than zero.";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    const { values, onChange, resetForm, setValues, errors, setErrors } = useForm(initialState, false, validate, {});

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryData = await CategoryService.getAll();
                setCategories(categoryData);

                const brandData = await BrandService.getAll();
                setBrands(brandData);

                const tagData = await TagService.getAll();
                setTags(tagData);

                if (id) {
                    const product = await ProductService.getById(parseInt(id));
                    setValues(product);
                    if (product.thumbnailImage) {
                        setImagePreview(product.thumbnailImage);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [id, setValues]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append('ProductId', values.productId.toString());
            formData.append('Name', values.name);
            formData.append('Description', values.description);
            formData.append('Price', values.price.toString());
            formData.append('CategoryId', values.categoryId!.toString());
            formData.append('TagId', values.tagId!.toString());
            formData.append('BrandId', values.brandId!.toString());
            formData.append('isActive', values.isActive.toString());
            if (image) {
                formData.append('Image', image);
            }

            try {
                if (id) {
                    await ProductService.update(Number(id), formData);
                } else {
                    await ProductService.add(formData);
                }
                navigate("/");
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom align="center">
                    {id ? "Edit Product" : "Add Product"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Product Name */}
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Product Name"
                                value={values.name}
                                onChange={onChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                value={values.description}
                                onChange={onChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Grid>

                        {/* Price */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="price"
                                label="Price"
                                type="number"
                                value={values.price}
                                onChange={onChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/* Category */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="categoryId"
                                    value={values.categoryId || ""}
                                    onChange={onChange}
                                    label="Category"
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Brand */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    name="brandId"
                                    value={values.brandId || ""}
                                    onChange={onChange}
                                    label="Brand"
                                >
                                    {brands.map(brand => (
                                        <MenuItem key={brand.brandId} value={brand.brandId}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Tag */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Tag</InputLabel>
                                <Select
                                    name="tagId"
                                    value={values.tagId || ""}
                                    onChange={onChange}
                                    label="Tag"
                                >
                                    {tags.map(tag => (
                                        <MenuItem key={tag.tagId} value={tag.tagId}>
                                            {tag.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Image Preview & Upload */}
                        <Grid item xs={12}>
                            <Box mb={2} textAlign="center">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                )}
                            </Box>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'block', margin: '0 auto' }}
                            />
                        </Grid>

                        {/* Active Checkbox */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.isActive}
                                        onChange={(e) => onChange({ target: { name: 'isActive', value: e.target.checked } })}
                                        name="isActive"
                                    />
                                }
                                label="Is Active"
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Button type="submit" color="primary" variant="contained" size="large">
                                    Submit
                                </Button>
                                <Button onClick={resetForm} color="secondary" variant="contained" size="large">
                                    Reset
                                </Button>
                                <Button onClick={() => navigate("/")} color="default" variant="contained" size="large">
                                    Back to List
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};
