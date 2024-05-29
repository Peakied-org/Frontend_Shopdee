'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchStores } from '@/redux/features/storeSlice';
import Image from 'next/image';
import convertImgUrl from '../ControlSystem/convertImgUrl';

export default function ListStore() {
    const dispatch = useAppDispatch();
    const { stores, sloading, error } = useAppSelector((state) => state.stores);

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    if (sloading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-20">
            {stores.map((item) => (
                <div key={item.id} className="bg-white my-6 flex flex-row p-4 shadow-md rounded-md items-center justify-between">
                    <div className="flex flex-row  items-center">
                        <Image src={convertImgUrl(item.image)} alt={item.name} width={1000} height={1000} className="w-24 h-24 object-cover brightness-50"/>
                        <div className="ml-10 text-2xl font-semibold">{item.name}</div>
                    </div>
                    <Link href={`/store/${item.id}`} passHref>
                        <button className="bg-[#00BF7A] px-12 py-3 rounded text-white font-semibold text-2xl my-4 mr-10">View</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
