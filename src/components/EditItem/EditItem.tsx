"use client"
import { useState } from "react";
import { category } from "@/category";

export default function EditItem({ sid }: { sid: number }) {
    const [opt, setOpt] = useState(["red", "green", "blue"]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newOption, setNewOption] = useState("");

    const handleAddOption = () => {
        if (newOption.trim() !== "") {
            setOpt([...opt, newOption]);
            setNewOption("");
            setIsPopupOpen(false);
        }
    };

    const handleRemoveLastOption = () => {
        if (opt.length > 0) {
            setOpt(opt.slice(0, -1));
        }
    };

    return (
        <div className="mt-16 bg-white">
            <div className="text-4xl font-semibold py-8 text-center underline underline-offset-2">Edit Product</div>
            <div className="grid grid-cols-5 mt-10">
                {/* MainPic */}
                <div className="col-span-2 flex flex-col text-center place-content-center items-center">
                    <div className="text-2xl font-semibold">Main Picture</div>
                    <div className="text-5xl font-bold mt-5 px-36 py-32 bg-gray-400 text-white">+</div>
                    <button className="border-2 border-gray-400 rounded py-2 px-5 mt-5">Select Image</button>
                    <div className="my-5 text-gray-400">
                        <div>File size: maximum 1 MB</div>
                        <div>File extension: .JPEG, .PNG</div>
                    </div>
                </div>
                {/* Form */}
                <div className="col-span-3 mr-10">
                    <input type="text" placeholder="Shop Name" className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"/>
                    <div className="flex flex-row justify-start">
                        <input type="text" placeholder="Price" className="p-6 border-2 rounded border-gray-700 my-2 text-xl mr-auto"/>
                        <input type="text" placeholder="Stock" className="p-6 border-2 rounded border-gray-700 my-2 text-xl mr-auto"/>
                        <select name="Category" className="p-6 border-2 rounded border-gray-700 my-2 text-xl mr-auto">
                            {category.map((item) => (
                                <option key={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <textarea placeholder="Description" className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl pb-20"/>
                    <div className="flex flex-row">
                        <button className="w-auto px-5 mr-2 h-20 text-5xl rounded border-2 border-black" onClick={() => setIsPopupOpen(true)}>+</button>
                        <div className="flex flex-row overflow-x-auto bg-slate-200 rounded">
                            {opt.map((item, index) => (
                                <div key={index} className="bg-white h-20 w-auto px-5 mx-2 text-2xl rounded border-2 border-black flex items-center justify-center">{item}</div>
                            ))}
                        </div>
                        <button className="w-auto px-6 ml-2 h-20 text-5xl rounded border-2 border-black" onClick={handleRemoveLastOption}>-</button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-10 rounded">
                        <h2 className="text-2xl font-semibold mb-4">Add New Option</h2>
                        <input 
                            type="text" 
                            value={newOption} 
                            onChange={(e) => setNewOption(e.target.value)} 
                            placeholder="New Option" 
                            className="w-full p-4 border-2 rounded border-gray-700 mb-4 text-xl"
                        />
                        <div className="flex justify-end">
                            <button 
                                className="mr-4 px-4 py-2 bg-gray-300 rounded" 
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-4 py-2 bg-[#00BF7A] text-white rounded" 
                                onClick={handleAddOption}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Optional Pic */}
            <div className="grid grid-cols-4 mt-10 ml-7">
                <div className="flex flex-col text-center place-content-center items-center">
                    <div className="text-5xl font-bold mt-5 px-36 py-32 bg-gray-400 text-white">+</div>
                    <button className="border-2 border-gray-400 rounded py-2 px-5 mt-5">Select Image</button>
                    <div className="my-5 text-gray-400">
                        <div>File size: maximum 1 MB</div>
                        <div>File extension: .JPEG, .PNG</div>
                    </div>
                </div>
                <div className="flex flex-col text-center place-content-center items-center">
                    <div className="text-5xl font-bold mt-5 px-36 py-32 bg-gray-400 text-white">+</div>
                    <button className="border-2 border-gray-400 rounded py-2 px-5 mt-5">Select Image</button>
                    <div className="my-5 text-gray-400">
                        <div>File size: maximum 1 MB</div>
                        <div>File extension: .JPEG, .PNG</div>
                    </div>
                </div>
                <div className="flex flex-col text-center place-content-center items-center">
                    <div className="text-5xl font-bold mt-5 px-36 py-32 bg-gray-400 text-white">+</div>
                    <button className="border-2 border-gray-400 rounded py-2 px-5 mt-5">Select Image</button>
                    <div className="my-5 text-gray-400">
                        <div>File size: maximum 1 MB</div>
                        <div>File extension: .JPEG, .PNG</div>
                    </div>
                </div>
                <div className="flex flex-col text-center place-content-center items-center">
                    <button className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5 rounded">Edit</button>
                </div>
            </div>
        </div>

    );
}
