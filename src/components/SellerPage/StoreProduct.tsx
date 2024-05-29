"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import convertImgUrl from "../ControlSystem/convertImgUrl";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchStores } from "@/redux/features/storeSlice";

export default function StoreProduct({ sid }: { sid: number }) {
    const dispatch = useAppDispatch();
    const { stores, sloading, error } = useAppSelector((state) => state.stores);
    const [store, setStore] = useState<Store | null>(null);

    useEffect(() => {
        if (stores.length === 0) {
            dispatch(fetchStores());
        }
    }, [dispatch, stores.length]);

    useEffect(() => {
        if (!sloading && stores.length > 0) {
            const matchedStore = stores.find((store) => store.id === Number(sid));
            setStore(matchedStore || null);
        }
    }, [stores, sloading, sid]);

    if (sloading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!store) {
        return <div>No store found</div>;
    }

    return (
        <div className="mt-10">
            <div className="grid grid-cols-4 gap-4 px-5">
                {store.items.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} passHref>
                        <div>
                            <Image
                                src={convertImgUrl(item.images[0])}
                                alt={item.name}
                                width={1000}
                                height={1000}
                            />
                            <div className="bg-white py-2 px-2">
                                <div className="text-2xl">{item.name}</div>
                                <div className="line-through text-sm pt-2 text-gray-400">
                                    ฿{item.cost}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="text-2xl text-[#00BF7A]">
                                        ฿{(item.cost - item.cost * (item.discount / 100)).toFixed(2)}
                                    </div>
                                    <div className="">ขายแล้ว {item.sold} ชิ้น</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
