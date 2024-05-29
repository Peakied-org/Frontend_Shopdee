"use client"
import { useSession } from 'next-auth/react';
import getUserProfile from '@/lib/getUserProfile';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";
import { useState, useEffect } from 'react';

export default function SellerDetailEdit(){
    const dispatch = useAppDispatch();
    const { stores, sloading  } = useAppSelector((state) => state.stores);
    const [store, setStore] = useState<Store | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const {data:session} = useSession();
    
    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);
    
    if(session){
    useEffect(() => {
        const fetchData = async () => {
          const profile = await getUserProfile(session.user.body.token);
          if (profile) {
            setUser(profile);
          }
        };
        fetchData();
        }, []);

        useEffect(() => {
            const fetchProductAndStores = async () => {
                try {
                    if (!sloading && stores.length > 0) {
                      const matchedStore = stores.find((store: { userID: number }) => store.userID === user?.body.id);
                      setStore(matchedStore || null);
                    }
                } catch (error) {
                    console.error('Error fetching product or stores:', error);
                }
            };
      
            fetchProductAndStores();
        }, [sloading, stores]);
    }
    if(!store){
        return null
    }
    
    return (
        <div className="mt-16 bg-white">
            <div className="pt-10 pl-7 text-4xl font-semibold my-10">Edit Your Shop Profile</div>
            <div className="grid grid-cols-2">
                {/* LeftSide */}
                    <div className="flex flex-col place-content-center items-center w-full">
                        <input type="text" placeholder="Shop Name" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <input type="text" placeholder="Description" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                    </div>
                {/* RightSide */}
                    <div className="flex flex-col place-content-center items-center w-full">
                        <input type="text" placeholder="Profile Image" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <input type="text" placeholder="Banner Image" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                    </div>
            </div>
            <div className="flex flex-row mx-32 justify-end">
                <button className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mt-10 mb-10 rounded">Save</button>
            </div>
        </div>
    )
}
