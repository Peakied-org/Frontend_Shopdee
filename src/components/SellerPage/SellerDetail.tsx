"use client"
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import { useEffect, useState } from "react";
import convertImgUrl from '../ControlSystem/convertImgUrl';
import Image from 'next/image';

export default function SellerPage({ sid }: { sid: number }) {
    const [store, setStore] = useState<Store | null>(null);
    const dispatch = useAppDispatch();
    const { stores, sloading } = useAppSelector((state) => state.stores);

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
        <div className="mt-16 bg-white">
            {store && (
                <>
                    <div className="py-10 pl-7 text-4xl font-semibold">{store.name}</div>
                    <Image src={convertImgUrl(store.banner)} width={700} height={700} className="px-20 w-auto h-auto" alt="Store Banner"/>
                    <div className="pt-10 pl-7 text-3xl font-semibold">Description</div>
                    <div className="py-7 pl-12 text-xl ">{store.detail}</div>
                </>
            )}
        </div>
    );
}
