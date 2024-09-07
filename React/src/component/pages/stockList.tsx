import React, { useState, useMemo, useEffect } from 'react';
import { IStock } from '../../interfaces';
import { StockService } from '../../utility/services';
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
    id: 'lastPurchaseDate' | 'product' | 'quantity' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string | number;
}

const columns: Column[] = [
    { id: 'lastPurchaseDate', label: 'Last Purchase Date', minWidth: 100 },
    { id: 'product', label: 'Product', minWidth: 100 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];

export const StockList: React.FC = () => {
    const classes = useStyles();
    const [stocks, setStocks] = useState<IStock[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const stockList = await StockService.getAll();
            setStocks(stockList);
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
        return stocks.filter(s =>
            !search || s.product?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [stocks, search]);

    const navigateToEditStock = (record: IStock) => {
        navigate(`/update-stock/${record.stockId}`);
    };

    const deleteStock = async (record: IStock) => {
        try {
            const deleteResult = await StockService.delete(record.stockId);
            if (deleteResult.isSuccess) {
                const stockList = await StockService.getAll();
                setStocks(stockList);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h1>Stock List</h1>
            <div>&nbsp;</div>
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
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock: IStock) => (
                                <TableRow key={stock.stockId}>
                                    <TableCell>{new Date(stock.lastPurchaseDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{stock.product?.name}</TableCell>
                                    <TableCell>{stock.quantity}</TableCell>
                                    <TableCell>
                                        <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => navigateToEditStock(stock)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button text="Delete" color="primary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete?')) deleteStock(stock) }} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100, { value: -1, label: 'All' }]}
                    component="div"
                    count={stocks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};
