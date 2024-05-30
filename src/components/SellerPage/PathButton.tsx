"use client"
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import getUserProfile from '@/lib/getUserProfile';

export default function PathButton({ sid }: { sid: number }) {
    const dispatch = useAppDispatch();
    const { stores, sloading } = useAppSelector((state) => state.stores);
    const [store, setStore] = useState<Store | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);

    if (session) {
        useEffect(() => {
            const fetchData = async () => {
                const profile = await getUserProfile(session.user.body.token);
                if (profile) {
                    setUser(profile);
                }
            };
            fetchData();
        }, [session]);

        useEffect(() => {
            const fetchProductAndStores = async () => {
                try {
                    const matchedStore = stores.find((store: { id: number }) => store.id === Number(sid));
                    setStore(matchedStore || null);
                } catch (error) {
                    console.error('Error fetching product or stores:', error);
                }
            };

            fetchProductAndStores();
        }, [sloading, stores, user]);
    }

    if (!store) {
        return null;
    }

    if(user && store){
        if(user.body.role != "ADMIN" && user.body.id != store?.userID){
            return null
        }
    }

    return (
        <div className="flex flex-row place-content-center">
            {store && (
                <>
                    <Link href={`/store/${store.id}/addItem/`} passHref>
                        <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5 cursor-pointer">Add Product</div>
                    </Link>
                    <Link href={`/orders`} passHref>
                        <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5 cursor-pointer">View Order</div>
                    </Link>
                </>
            )}
        </div>
    );
}
