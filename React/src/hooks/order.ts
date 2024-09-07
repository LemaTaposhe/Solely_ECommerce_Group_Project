//import { useEffect, useState } from 'react';
//import { IOrder, IOrderStatus } from '../interfaces';
//import { OrderService } from '../services/OrderService';

//export const useOrders = () => {
//    const [orders, setOrders] = useState<IOrder[]>([]);
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchOrders = async () => {
//            try {
//                setLoading(true);
//                const data = await OrderService.getOrders();
//                setOrders(data);
//            } catch (err: any) {
//                setError(err.message);
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchOrders();
//    }, []);

//    const confirmOrder = async (orderId: number, status: IOrderStatus) => {
//        try {
//            await OrderService.confirmOrder(orderId, status);
//            setOrders((prevOrders) =>
//                prevOrders.map((order) =>
//                    order.orderId === orderId ? { ...order, status } : order
//                )
//            );
//        } catch (err: any) {
//            setError(err.message);
//        }
//    };

//    return { orders, loading, error, confirmOrder };
//};
import { useEffect, useState } from 'react';
import { IOrder, OrderStatus } from '../interfaces'; 
import { OrderService } from '../utility/services/orderService';

export const useOrders = (loadOrders: boolean) => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const orders = await OrderService.getOrders();
                setOrders(orders);
            } catch (error: any) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (loadOrders) {
            fetchOrders();
        }
    }, [loadOrders]);

    const confirmOrder = async (orderId: number) => {
        try {
            await OrderService.confirmOrder(orderId);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId ? { ...order } : order
                )
            );
        } catch (error: any) {
            setError(error.toString());
        }
    };

    return { orders, loading, error, confirmOrder };
};

