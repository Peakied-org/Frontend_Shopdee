'use client';
import { useState } from 'react';
import addStore from '@/lib/addStore';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function AddStore() {
    const { data: session } = useSession();
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleAddStore = async () => {
        if (!session || !session.user || !session.user.body.token) {
            setError('User is not authenticated');
            return;
        }
        
        try {
            const response = await addStore(session.user.body.token, shopName, description, profileImage, bannerImage);
            setSuccess("Store added successfully!");
            setError('');
            router.push('/');
        } catch (err:any) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div className="bg-white">
            <div className="pt-10 pl-7 text-4xl font-semibold my-10">Add Shop</div>
            <div className="grid grid-cols-2">
                {/* LeftSide */}
                <div className="flex flex-col place-content-center items-center w-full">
                    <input 
                        type="text" 
                        placeholder="Shop Name" 
                        className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Description"
                        className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {/* RightSide */}
                <div className="flex flex-col place-content-center items-center w-full">
                    <input
                        type="text"
                        placeholder="Profile Image"
                        className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Banner Image"
                        className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"
                        value={bannerImage}
                        onChange={(e) => setBannerImage(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-row mx-32 justify-end">
                <button 
                    className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mt-10 mb-10 rounded"
                    onClick={handleAddStore}
                >
                    Add
                </button>
            </div>
            {error && <div className="text-red-500 text-center mb-10">{error}</div>}
            {success && <div className="text-green-500 text-center mb-10">{success}</div>}
        </div>
    );
}
