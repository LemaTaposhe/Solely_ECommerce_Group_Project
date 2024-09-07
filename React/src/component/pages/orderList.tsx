import React, { useState, useMemo, useEffect } from 'react';
import { IOrder, OrderStatus } from "../../interfaces";
import { OrderService } from "../../utility/services";
import { Button } from "../controll/Button";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Snackbar,
    CircularProgress
} from "@material-ui/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

interface Column {
    id: 'customerEmail' | 'orderDate' | 'subtotal' |'total'| 'status' | 'deliveryMethod' | 'confirm' | 'viewItems';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string | number;
}

const columns: Column[] = [
    { id: 'customerEmail', label: 'Customer Email', minWidth: 150 },
    { id: 'orderDate', label: 'Order Date', minWidth: 150 },
    { id: 'subtotal', label: 'Subtotal', minWidth: 100, format: (value: number) => value.toFixed(2) },
    { id: 'total', label: 'total', minWidth: 100, format: (value: number) => value.toFixed(2) },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'deliveryMethod', label: 'Delivery Method', minWidth: 150 },
    { id: 'confirm', label: 'Confirm', minWidth: 100 },
    { id: 'viewItems', label: 'View Items', minWidth: 100 },
];

export const OrderList = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await OrderService.getOrders();
                setOrders(fetchedOrders);
            } catch (err: any) {
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handlePageChange = (event: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return orders.filter(order => !search || order.customerEmail?.toLowerCase().includes(search.toLowerCase()));
    }, [orders, search]);

    const confirmOrder = async (orderId: number) => {
        try {
            await OrderService.confirmOrder(orderId);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderId === orderId ? { ...order, status: OrderStatus.Confirmed } : order
                )
            );
            setSnackbarMessage('Order confirmed successfully');
            setSnackbarOpen(true);
        } catch (error) {
            setError('Failed to confirm order');
        }
    };

    const viewOrderItems = (orderId: number) => {
        navigate(`/order-items/${orderId}`);
    };

    if (loading) return <div className={classes.loader}><CircularProgress /></div>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <Container>
            <h1 className={classes.title}>Order List</h1>
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
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order: IOrder) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{order.customerEmail}</TableCell>
                                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.subtotal ? order.subtotal.toFixed(2) : 'N/A'}</TableCell>
                                    <TableCell>{order.total ? order.total.toFixed(2) : 'N/A'}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{order.deliveryMethod || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button
                                            text="Confirm"
                                            color="primary"
                                            size="small"
                                            variant="contained"
                                            onClick={() => confirmOrder(order.orderId)}
                                            disabled={order.status === OrderStatus.Confirmed}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            text="View Items"
                                            color="default"
                                            size="small"
                                            variant="contained"
                                            onClick={() => viewOrderItems(order.orderId)}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};
