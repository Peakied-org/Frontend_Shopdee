'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cartitem } from '@/cartItem';
import { coupon } from '@/mockCoupon';

type Coupon = {
    id: number;
    name: string;
    discount: string;
    start_date: string;
    expiry_date: string;
};

export default function CartItems() {
    const [items, setItems] = useState(cartitem);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();

    useEffect(() => {
        calculateTotal();
    }, [items, selectedCoupon]);

    const calculateTotal = () => {
        const itemTotal = items.reduce((sum, item) => sum + (item.cost - item.discount) * item.quantity, 0);
        const discount = selectedCoupon ? (itemTotal * parseInt(selectedCoupon.discount) / 100) : 0;
        setTotalPrice(itemTotal - discount);
    };

    const plusQuantity = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const minusQuantity = (id: number) => {
        setItems(items.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const deleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleCouponChange = (event: any) => {
        const couponId = parseInt(event.target.value);
        const selected = coupon.find(c => c.id === couponId) || null;
        setSelectedCoupon(selected);
    };

    const handleOrder = () => {
        router.push(`/payment?price=${totalPrice}`);
    };

    return (
        <div className=''>
            {/* Header Bar */}
            <div className="bg-white p-4 mb-4">
                <div className="grid grid-cols-6 gap-4 items-center font-semibold">
                    <div className="col-span-2 text-center">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                    <div></div>
                </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white p-4">            
            {items.map(item => (
                <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b py-4">
                    {/* Image */}
                    <div className="flex justify-center">
                        <img src={item.picture[0]} alt={item.name} className="w-24 h-24 object-cover" />
                    </div>
                    {/* Name */}
                    <div>
                        <div className="text-lg font-bold">{item.name}</div>
                    </div>
                    {/* Price */}
                    <div>
                        <div className="line-through text-gray-500 text-xs">{item.cost} ฿</div>
                        <div className="text-2xl text-green-600 font-semibold">{item.cost - item.discount} ฿</div>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center">
                        <button onClick={() => minusQuantity(item.id)} className="px-2 border">
                            -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => plusQuantity(item.id)} className="px-2 border">
                            +
                        </button>
                    </div>
                    {/* Total Price */}
                    <div className="text-2xl text-green-600 font-semibold">
                        {item.quantity * (item.cost - item.discount)} ฿
                    </div>
                    {/* Delete Button */}
                    <div>
                        <button onClick={() => deleteItem(item.id)} className="text-red-500">
                            DELETE
                        </button>
                    </div>
                </div>
            ))}
            </div>

            {/* Coupon and Total Price Section */}
            <div className="bg-white p-4 mt-4 grid grid-cols-4 gap-4 items-center">
                {/* Select Coupon Message */}
                <div className="text-center text-2xl">Select Coupon</div>
                
                {/* Coupon Selection */}
                <div className="flex justify-center">
                    <select id="coupon" onChange={handleCouponChange} className="border p-2">
                        <option value="">No Coupon</option>
                        {coupon.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name} - {c.discount}%
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Total Price Message */}
                <div className="text-center text-2xl">Total Price</div>
                
                {/* Total Price and Order Button */}
                <div className="flex flex-col items-center">
                    <span className="text-green-600 text-lg">{totalPrice} ฿</span>
                    <button onClick={handleOrder} className="bg-green-500 text-white px-4 py-2 mt-2">Order</button>
                </div>
            </div>
        </div>
    );
}
