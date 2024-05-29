"use client"
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import { fetchItems } from '@/redux/features/itemSlice';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StoreProduct({ sid }: { sid: number }) {
    const [store, setStore] = useState<Store | null>(null);
    const dispatch = useAppDispatch();
    const { stores, sloading } = useAppSelector((state) => state.stores);
    const { items, loading } = useAppSelector(state => state.items);

    useEffect(() => {
        dispatch(fetchStores());
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        if (!sloading && stores.length > 0) {
            const matchedStore = stores.find((store) => store.id === Number(sid));
            setStore(matchedStore || null);
        }
    }, [stores, sloading, sid]);

    if (sloading || loading) {
        return <div>Loading...</div>;
    }

    if (!store) {
        return <div>No store found</div>;
    }

    return (
        <div className="mt-10">
            <div className="grid grid-cols-4 gap-4 px-5">
                {items.map((item) => (
                    store?.items.includes(item.id) ? (
                        <Link key={item.id} href={`/product/${item.id}`} passHref>
                            <img src={item.images[0]} alt={item.name} />
                            <div className='bg-white py-2 px-2'>
                                <div className='text-2xl'>{item.name}</div>
                                <div className='line-through text-sm pt-2 text-gray-400'>฿{item.cost}</div>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-2xl text-[#00BF7A]'>฿{(item.cost - item.cost * (item.discount / 100)).toFixed(2)}</div>
                                    <div className=''>ขายแล้ว {item.sold} ชิ้น</div>
                                </div>
                            </div>
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
    );
}
