'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from '@/redux/features/cartSlice';
import { fetchCoupons } from "@/redux/features/couponSlice";
import convertImgUrl from "../ControlSystem/convertImgUrl";
import Image from 'next/image';
import addCart from '@/lib/addCart';
import editCart from '@/lib/editCart';
import addOrder from '@/lib/addOrder';
import { useSession } from 'next-auth/react';

export default function CartItems() {
    const { data: session } = useSession();
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const { coupons } = useAppSelector((state) => state.coupons);

    useEffect(() => {
        dispatch(fetchCoupons()).finally(() => setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        calculateTotal();
    }, [items, selectedCoupon]);

    const calculateTotal = () => {
        const itemTotal = items.reduce((sum, item) => sum + (item.cost - (item.cost * item.discount) / 100) * item.quantity, 0);
        const discount = selectedCoupon ? (itemTotal * selectedCoupon.discount / 100) : 0;
        setTotalPrice(itemTotal - discount);
    };

    const plusQuantity = (id: number) => {
        dispatch(incrementQuantity(id));
    };

    const minusQuantity = (id: number) => {
        dispatch(decrementQuantity(id));
    };

    const deleteItem = (id: number) => {
        dispatch(removeItem(id));
    };

    const handleCouponChange = (event: any) => {
        const couponId = parseInt(event.target.value);
        const selected = coupons.find(c => c.id === couponId) || null;
        setSelectedCoupon(selected);
    };

    const handleOrder = async () => {
        if (session) {
            const token = session.user.body.token;

            try {
                // Promise.all(items.map(item => console.log(item.id, item.type, item.quantity)))
                for (const item of items) {
                    const cartDetails = await addCart(item.id, token, item.type);
                    const matchingCartDetail = cartDetails.find((cartDetail: { itemID: number }) => cartDetail.itemID === item.id);

                    if (!matchingCartDetail) {
                        throw new Error("No matching cart detail found");
                    }

                    await editCart(matchingCartDetail.id, token, item.quantity);
                }
                await addOrder(token);
                dispatch(clearCart());
                router.push(`/payment?price=${totalPrice}`);
            } catch (error) {
                console.error('Error processing order:', error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mx-6'>
            {/* Header Bar */}
            <div className="bg-white p-4 mb-4">
                <div className="grid grid-cols-6 text-xl gap-4 items-center font-semibold">
                    <div className="col-span-2 text-center">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white p-4">            
                {items.map(item => (
                    <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b py-4">
                        {/* Image */}
                        <div className="flex justify-center">
                            <Image src={convertImgUrl(item.picture)} alt={item.name} width={100} height={100} className="w-24 h-24 object-cover" />
                        </div>
                        {/* Name */}
                        <div>
                            <div className="text-xl font-bold">{item.name}</div>
                        </div>
                        {/* Price */}
                        <div>
                            <div className="line-through text-gray-500 text-xs">{item.cost} ฿</div>
                            <div className="text-2xl text-green-600 font-semibold">{item.cost - (item.cost * item.discount) / 100} ฿</div>
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
                            {item.quantity * (item.cost - (item.cost * item.discount) / 100)} ฿
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
                <div className="text-center text-2xl">Select Coupon</div>
                {/* Coupon Selection */}
                <div className="flex justify-center">
                    <select id="coupon" onChange={handleCouponChange} className="border p-2">
                        <option value="">No Coupon</option>
                        {coupons.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name} - {c.discount}%
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-center text-2xl">Total Price</div>
                <div className="flex flex-col items-center">
                    <span className="text-green-600 text-lg">{totalPrice} ฿</span>
                    <button onClick={handleOrder} className="bg-green-500 text-white px-4 py-2 mt-2">Order</button>
                </div>
            </div>
        </div>
    );
}
