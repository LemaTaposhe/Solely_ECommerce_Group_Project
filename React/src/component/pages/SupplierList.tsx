import { ISupplier } from "../../interfaces/iSupplier"
import { SupplierService } from "../../utility/services/supplierService"
import { SupplierHook } from "../../hooks"
import { Button } from "../controll/Button"
import React, { useState, useMemo } from 'react'
import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core"
import { useNavigate, useSearchParams } from "react-router-dom"

interface Column {
    id: 'supplierName' | 'email' | 'contactNo' | 'address' | 'isActive' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'supplierName', label: 'Supplier Name', minWidth: 100 },
    { id: 'email', label: 'Email Address', minWidth: 100 },
    { id: 'contactNo', label: 'Contact NO', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },

    { id: 'isActive', label: 'IsActive?', minWidth: 100 },

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

export const SupplierList = () => {
    const { data: categories, setData: setData } = SupplierHook(true)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '')
    const navigate = useNavigate();

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    const showFirstButton = true;
    const filteredData = useMemo(() => {
        return categories.filter(c => !search || c.supplierName.includes(search))
    }, [categories, search])

    const navigateToAddSupplier = () => {
        navigate("/add-supplier")
    }
    const navigateToEditSupplier = (record: any) => {
        navigate(`/update-supplier/${record.supplierId}`)
    }
    const deleteSupplier = async (record: any) => {
        try {
            const deleteSupplier = await SupplierService.delete(record.supplierId);
            if (deleteSupplier.isSuccess) {
                const supplierList = await SupplierService.getAll();
                setData(supplierList);

            }
        }
        catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <Container>
                <h1>Supplier Catelog</h1>
                <Button text="Add Supplier" color="primary" size="small" variant="contained" onClick={navigateToAddSupplier} />
                <div>&nbsp;</div>
                <TextField id="search" label="search" variant="outlined" value={search} onChange={(e) => { setSearch(e.target.value) }} fullWidth />
                <div>&nbsp;</div>

                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader area-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>

                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: ISupplier) => {
                                    return (
                                        <TableRow key={record.supplierId}>
                                            <TableCell>{record.supplierName}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.contactNo}</TableCell>
                                            <TableCell>{record.address}</TableCell>
                                            <TableCell>{String(record.isActive)}</TableCell>
                                            <TableCell>
                                                <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => { navigateToEditSupplier(record) }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button text="Delete" color="secondary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure to delete??')) deleteSupplier(record) }} />
                                            </TableCell>
                                        </TableRow>

                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination rowsPerPageOptions={[5, 10, 25, 50, 100, { value: -1, label: 'All' }]} component="div" count={categories.length} rowsPerPage={rowsPerPage} page={page}
                        onPageChange={handlePageChange} onRowsPerPageChange={handleChangeRowsPerPage} />
                </Paper>
            </Container>
        </>
    );

}