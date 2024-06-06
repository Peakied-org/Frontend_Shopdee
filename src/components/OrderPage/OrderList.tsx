'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrders } from "@/redux/features/orderSlice";
import Image from "next/image";
import convertImgUrl from "../ControlSystem/convertImgUrl";

export default function OrderList() {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    const { orders, loading, error } = useAppSelector((state) => state.orders);

    useEffect(() => {
        if (status === "loading") {
            // Session is loading
            return;
        }

        if (session) {
            dispatch(fetchOrders(session.user.body.token));
        }
    }, [session, status, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center">
            {orders.map(order => (
                <div key={order.id} className="bg-white p-6 mb-4 shadow-md w-[70%] justify-between">
                    {order.orderDetails.map(item => (
                        <div key={item.id} className="grid grid-cols-4 gap-4 items-center border-b py-2">
                            {/* Image */}
                            <div className="flex justify-center">
                                <Image src={convertImgUrl(item.image)} alt={item.name} height={1000} width={1000} className="w-24 h-24 object-cover" />
                            </div>
                            {/* Name */}
                            <div>
                                <div className="text-lg font-bold">{item.name}</div>
                            </div>
                            {/* Price */}
                            <div className="text-2xl text-green-600 font-semibold">
                                {item.cost * item.quantity} ฿
                            </div>
                            <div className={`text-xl ${
                                item.status === 'ORDER' ? 'text-red-500'
                                : item.status === 'SHIPPING' ? 'text-yellow-500'
                                : item.status === 'RECIVE' ? 'text-green-500'
                                : ''}`}>
                                {item.status}
                            </div>                           
                        </div>
                        
                    ))}
                    <div className="grid grid-cols-4 gap-4 items-center py-2 mt-2 font-semibold">
                        <div className="col-span-2 text-3xl text-center">Total Cost</div>
                        <div className="col-span-2 text-3xl text-green-600 text-center">
                            {order.totalCost} ฿
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
