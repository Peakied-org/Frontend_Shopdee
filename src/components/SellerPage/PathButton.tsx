"use client"
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import { useEffect, useState } from "react";

export default function PathButton({ sid }: { sid: number }) {
    const dispatch = useAppDispatch();
    const { stores, sloading } = useAppSelector((state) => state.stores);
    const [store, setStore] = useState<Store | null>(null);

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    useEffect(() => {
        if (!sloading && stores.length > 0) {
            const matchedStore = stores.find((store: { id: number }) => store.id === Number(sid));
            setStore(matchedStore || null);
        }
    }, [stores, sloading, sid]);

    return (
        <div className="flex flex-row place-content-center">
            {store && (
                <>
                    <Link href={`/store/${store.id}/addItem/`} passHref>
                        <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5 cursor-pointer">Add Product</div>
                    </Link>
                    <Link href={`/`} passHref>
                        <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5 cursor-pointer">View Order</div>
                    </Link>
                </>
            )}
        </div>
    );
}
