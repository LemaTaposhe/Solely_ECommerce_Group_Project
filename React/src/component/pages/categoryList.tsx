import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, makeStyles } from "@material-ui/core";
import { ICategory } from "../../interfaces";
import { CategoryService } from "../../utility/services";
import { CategoryHook } from "../../hooks";
import { Button } from "../controll/Button";

interface Column {
    id: 'name' | 'description' | 'isActive' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: Column[] = [
    { id: 'name', label: 'Category Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'isActive', label: 'Is Active?', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export const CategoryList = () => {
    const { data: categories, setData: setCategories } = CategoryHook(true);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return categories.filter(c => !search || c.name?.toLowerCase().includes(search.toLowerCase()));
    }, [categories, search]);

    const navigateToAddCategory = () => {
        navigate("/add-category");
    };

    const navigateToEditCategory = (record: any) => {
        navigate(`/update-category/${record.categoryId}`);
    };

    const deleteCategory = async (record: ICategory) => {
        try {
            const deleteResponse = await CategoryService.delete(record.categoryId);
            if (deleteResponse.isSuccess) {
                const categoryList = await CategoryService.getAll();
                setCategories(categoryList);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h1>Category List</h1>
            <Button text="Add Category" color="primary" size="small" variant="contained" onClick={navigateToAddCategory} />
            <div>&nbsp;</div>
            <TextField id="search" label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: ICategory) => {
                                return (
                                    <TableRow key={record.categoryId}>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell>{record.isActive ? "Yes" : "No"}</TableCell>
                                        <TableCell>
                                            <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => navigateToEditCategory(record)} />
                                        </TableCell>
                                        <TableCell>
                                            <Button text="Delete" color="primary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete?')) deleteCategory(record); }} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100, { value: -1, label: 'All' }]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};
