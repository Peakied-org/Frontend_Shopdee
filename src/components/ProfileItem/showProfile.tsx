'use client'
import getUserProfile from "@/lib/getUserProfile";
import editProfile from "@/lib/userEdit";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function ShowProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [isSeller, setSeller] = useState(false);
    const { data: session } = useSession();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editData, setEditData] = useState({
        tel: "",
        address: "",
        cardNumber: ""
    });

    useEffect(() => {
        if (session) {
            const fetchData = async () => {
                const profile = await getUserProfile(session.user.body.token);
                if (profile) {
                    setUser(profile);
                    setEditData({
                        tel: profile.body.tel,
                        address: profile.body.address,
                        cardNumber: profile.body.cardNumber
                    });
                    if(profile.body.role != "USER"){
                        setSeller(true);
                    }
                }
            };
            fetchData();
        }
    }, [session]);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        if (session) {
            try {
                await editProfile(session.user.body.token, editData.tel, editData.address, editData.cardNumber);
                setUser((prev) => prev ? { ...prev, body: { ...prev.body, ...editData } } : prev);
                setIsPopupOpen(false);
            } catch (error) {
                console.error("Error editing profile:", error);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative max-w-md mt-16 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white text-center py-4">
                <h1 className="text-2xl font-bold">User Profile</h1>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Name</h2>
                    <p className="text-gray-700">{user.body.name}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Role</h2>
                    <p className="text-gray-700">{user.body.role}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">User ID</h2>
                    <p className="text-gray-700">{user.body.id}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Telephone</h2>
                    <p className="text-gray-700">{user.body.tel}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Address</h2>
                    <p className="text-gray-700">{user.body.address}</p>
                </div>
                {
                    isSeller ? 
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Card Number</h2>
                    <p className="text-gray-700">{user.body.cardNumber}</p>
                </div>    : ""
                }
                
            </div>
            <div
                className="absolute bottom-4 right-4 cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
            >
                <FaPencilAlt color="gray" size={24} />
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-10 rounded shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Telephone
                            </label>
                            <input
                                type="text"
                                name="tel"
                                value={editData.tel}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={editData.address}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        {
                            isSeller?
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Card Number
                            </label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={editData.cardNumber}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>    : ""
                        }
                        
                        <div className="flex justify-end">
                            <button
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleEditSubmit}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
