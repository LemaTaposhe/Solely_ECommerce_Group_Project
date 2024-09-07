import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box } from '@material-ui/core';
import { IOrder, IOrderItem, OrderStatus, PaymentStatus } from '../../interfaces';
import { useOrders } from '../../hooks';

const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { orders } = useOrders(true);

    // Check if orderId is defined before parsing
    const parsedOrderId = orderId ? parseInt(orderId) : undefined;
    const order = parsedOrderId ? orders.find(o => o.orderId === parsedOrderId) : undefined;

    if (!order) {
        return <Typography variant="h6">Order not found</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h6">Order ID: {order.orderId}</Typography>
                        <Typography variant="body1">Customer Email: {order.customerEmail}</Typography>
                        <Typography variant="body1">Order Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                        <Typography variant="body1">Status: {order.status}</Typography>
                        {/*<Typography variant="body1">Payment Status: {order.paymentStatus}</Typography>*/}
                        <Typography variant="body1">Order Note: {order.orderNote || 'None'}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h6">Shipping Address</Typography>
                        <Typography variant="body1">{order.shippingAddress?.phone}</Typography>
                        <Typography variant="body1">{order.shippingAddress?.city}, {order.shippingAddress?.districtId} {order.shippingAddress?.zipCode}</Typography>
                        <Typography variant="body1">{order.shippingAddress?.zipCode}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Delivery Method</Typography>
                    {/*<Typography variant="body1">{order.deliveryMethod.shortName} - ${order.deliveryMethod.price.toFixed(2)}</Typography>*/}
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderItems.map((item: IOrderItem) => (
                            <TableRow key={item.orderItemId}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>${item.productPrice.toFixed(2)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${(item.productPrice * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={3}>
                <Typography variant="h6">Order Summary</Typography>
                {/*<Typography variant="body1">Subtotal: ${order.subTotal.toFixed(2)}</Typography>*/}
                {/*<Typography variant="body1">Shipping: ${order.deliveryMethod.price.toFixed(2)}</Typography>*/}
                {/*<Typography variant="body1">Total: ${order.orderTotal().toFixed(2)}</Typography>*/}
            </Box>
        </Container>
    );
};

export default OrderDetails;
