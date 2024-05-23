import { orderItem } from "@/order"

export default function OrderList(){

    const orderlist: Order[] = [...orderItem];

    return(
        <div className="flex flex-col items-center">
            {orderlist.map(order => (
                <div key={order.orderId} className="bg-white p-6 mb-4 shadow-md w-[70%] justify-between">
                    {order.items.map(item => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 items-center border-b py-2">
                            {/* Image */}
                            <div className="flex justify-center">
                                <img src={item.picture[0]} alt={item.name} className="w-24 h-24 object-cover" />
                            </div>
                            {/* Name */}
                            <div>
                                <div className="text-lg font-bold">{item.name}</div>
                            </div>
                            {/* Price */}
                            <div className="text-2xl text-green-600 font-semibold">
                                {(item.cost - item.discount) * item.quantity} ฿
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-3 gap-4 items-center py-2 mt-2 font-semibold">
                        <div className="col-span-1 text-3xl text-center">Total Cost</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1 text-3xl text-green-600">
                            {order.totalPrice} ฿
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}