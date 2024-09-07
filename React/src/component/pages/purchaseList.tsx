import React, { useState, useMemo, useEffect } from 'react';
import { IPurchase } from '../../interfaces';
import { PurchaseService } from '../../utility/services';
import { usePurchase } from "../../hooks";
import { Button } from '../controll/Button';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

interface Column {
    id: 'purchaseDate' | 'product' | 'supplier' | 'purchaseQuantity' | 'purchasePrice' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string | number;
}

const columns: Column[] = [
    { id: 'purchaseDate', label: 'Purchase Date', minWidth: 100 },
    { id: 'product', label: 'Product', minWidth: 100 },
    { id: 'supplier', label: 'Supplier', minWidth: 100 },
    { id: 'purchaseQuantity', label: 'Quantity', minWidth: 100 },
    { id: 'purchasePrice', label: 'Price', minWidth: 100, format: (value: number) => value.toFixed(2) },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];

export const PurchaseList: React.FC = () => {
    const classes = useStyles();
    const [purchases, setPurchases] = useState<IPurchase[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const purchaseList = await PurchaseService.getAll();
            setPurchases(purchaseList);
        };
        fetchData();
    }, []);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return purchases.filter(p =>
            !search || p.product?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [purchases, search]);

    const navigateToEditPurchase = (record: IPurchase) => {
        navigate(`/update-purchase/${record.purchaseId}`);
    };
    
    const navigateToAddPurchase = () => {
        navigate('/add-purchase');
    };

    const deletePurchase = async (record: IPurchase) => {
        try {
            const deleteResult = await PurchaseService.delete(record.purchaseId);
            if (deleteResult.isSuccess) {
                const purchaseList = await PurchaseService.getAll();
                setPurchases(purchaseList);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h1>Purchase List</h1>
            <div>&nbsp;</div>
            <Button text="Add Purchase" color="primary" size="small" variant="contained" onClick={navigateToAddPurchase} />
            <TextField id="search" label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((purchase: IPurchase) => (
                                <TableRow key={purchase.purchaseId}>
                                    <TableCell>{new Date(purchase.purchaseDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{purchase.product?.name}</TableCell>
                                    <TableCell>{purchase.supplier?.supplierName}</TableCell>
                                    <TableCell>{purchase.purchaseQuantity}</TableCell>
                                    <TableCell>{purchase.purchasePrice.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => navigateToEditPurchase(purchase)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button text="Delete" color="primary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete?')) deletePurchase(purchase) }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100, { value: -1, label: 'All' }]}
                    component="div"
                    count={purchases.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};
