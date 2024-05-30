"use client";

import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import Image from "next/image";
import convertImgUrl from "../ControlSystem/convertImgUrl";
import deleteItem from "@/lib/deleteItem";
import { useSession } from "next-auth/react";
import getUserProfile from "@/lib/getUserProfile";

export default function StoreProductDetail({ sid }: { sid: number }) {
    const { data: session } = useSession();
    const [store, setStore] = useState<Store | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const { stores, sloading, error } = useAppSelector((state) => state.stores);

    const [user, setUser] = useState<User | null>(null);

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
    }

    const handleDelete = async () => {
        if (itemToDelete !== null) {
            try {
                if(store && session && itemToDelete !== null){
                    await deleteItem(itemToDelete, session.user.body.token);
                    setStore({
                        ...store,
                        items: store.items.filter(item => item.id !== itemToDelete)
                    });
                setIsPopupOpen(false);
                setItemToDelete(null);
                }
                
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    if (sloading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
        <div className="mt-10">
            <div className="bg-white font-semibold text-3xl py-6 text-center">Your Product</div>
            <div className="">
                {store.items.map((item) => (
                    <div key={item.id} className="bg-white my-6 grid grid-cols-5 relative">
                        <Image src={convertImgUrl(item.images[0])} alt={item.name} width={1000} height={1000} className="p-6" />
                        <div className="content-center text-3xl ml-7 font-bold">{item.name}</div>
                        <div className="flex flex-col place-content-center text-center">
                            <div className="text-3xl font-bold">Order</div>
                            <div className="text-3xl ">{item.sold}</div>
                        </div>
                        <div className="flex flex-col place-content-center text-center">
                            <div className="text-3xl font-bold">Stock</div>
                            <div className="text-3xl ">{item.stock}</div>
                        </div>
                        <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-between items-end">
                            <Link href={`/store/${store?.id}/editItem/${item.id}`} passHref>
                                <FaPencilAlt color="gray" size={36} />
                            </Link>
                            <button className="bg-[#00BF7A] px-12 py-3 rounded text-white font-semibold text-2xl my-4 mr-10">View</button>
                            <RiDeleteBin6Fill color="red" size={36} onClick={() => {
                                setIsPopupOpen(true);
                                setItemToDelete(item.id);
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-10 rounded">
                        <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
