import React, { useState, useMemo } from 'react';
import { IProduct } from "../../interfaces";
import { ProductService } from "../../utility/services";
import { Button } from "../controll/Button";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useProduct } from "../../hooks";

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: 20,
    },
    container: {
        maxHeight: 440,
    },
    title: {
        margin: '20px 0',
        textAlign: 'center',
    },
    button: {
        margin: '10px 0',
    },
    search: {
        marginBottom: 20,
    },
});

interface Column {
    id: 'name' | 'price' | 'category' | 'brand' | 'tag' | 'quantity'|'isActive' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string | number;
}

const columns: Column[] = [
    { id: 'name', label: 'Product Name', minWidth: 150 },
    { id: 'brand', label: 'Brand', minWidth: 150 },
    { id: 'category', label: 'Category', minWidth: 150 },
    { id: 'tag', label: 'Tag', minWidth: 150 },
    { id: 'quantity', label: 'Stock', minWidth: 150 },
    { id: 'price', label: 'Price', minWidth: 100, format: (value: number) => value.toFixed(2) },
    { id: 'isActive', label: 'Is Active?', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];

export const ProductList = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { data: products, setData: setData } = useProduct(true);  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');

    const handlePageChange = (event: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return products.filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()));
    }, [products, search]);

    const navigateToAddProduct = () => {
        navigate('/add-product');
    };

    const navigateToEditProduct = (record: IProduct) => {
        navigate(`/update-product/${record.productId}`);
    };

    const deleteProduct = async (record: IProduct) => {
        try {
            const deleteResponse = await ProductService.delete(record.productId);
            if (deleteResponse.isSuccess) {
                const productList = await ProductService.getAll();
                setData(productList);
                // Instead of window.location.reload(), use setData to update the state
                // This avoids a full page reload and provides a smoother user experience
            }
        } catch (error: any) {
            console.log('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <h1 className={classes.title}>Product List</h1>
            <Button
                text="Add Product"
                color="primary"
                size="small"
                variant="contained"
                onClick={navigateToAddProduct}
                className={classes.button}
            />
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                className={classes.search}
            />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: IProduct) => (
                                <TableRow key={record.productId}>
                                    <TableCell>{record.name}</TableCell>
                                    <TableCell>{record.brand?.name}</TableCell>
                                    <TableCell>{record.category?.name}</TableCell>
                                    <TableCell>{record.tag?.name}</TableCell>
                                    <TableCell>{record.quantity}</TableCell>
                                    <TableCell>{record.price.toFixed(2)}</TableCell>
                                    <TableCell>{record.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button
                                            text="Edit"
                                            color="primary"
                                            size="small"
                                            variant="contained"
                                            onClick={() => navigateToEditProduct(record)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            text="Delete"
                                            color="secondary"
                                            size="small"
                                            variant="contained"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete?')) {
                                                    deleteProduct(record);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100, { value: -1, label: 'All' }]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};
