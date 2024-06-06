"use client"
import { useEffect, useState } from "react";
import { category } from "@/category";
import { useSession } from "next-auth/react";
import editItem from "@/lib/editItem";
import getItem from "@/lib/getItem";

export default function EditItem({ sid }: { sid: number }) {
    const { data: session } = useSession();

    const [opt, setOpt] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newOption, setNewOption] = useState("");
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [selected, setCategory] = useState("");
    const [detail, setDetail] = useState("");
    const [stock, setStock] = useState<string | null>(null);
    const [sold, setSold] = useState<string | null>(null);
    const [discount, setDiscount] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        async function fetchItem() {
            try {
                const item = await getItem(sid);
                setName(item.name);
                setCost(item.cost);
                setCategory(item.category);
                setDetail(item.detail);
                setStock(item.stock);
                setSold(item.sold);
                setDiscount(item.discount);
                setOpt(item.types || []);
                setImages(item.images || ["", "", "", ""]);
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }

        fetchItem();
    }, [sid]);

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

    const handleSubmit = async () => {
        try {
            const defaultImage = "https://drive.google.com/file/d/1zWDVmR9SKCw7BcgvOFTuLqKRGSArWATC/view?usp=drive_link";
            const finalImages = images.map(img => img ? img : defaultImage);
            if(finalImages.length < 4){
                while(finalImages.length<4){
                    finalImages.push(defaultImage)
                }
            }
            //console.log(finalImages)
            if (session) {
                const response = await editItem(sid, session.user.body.token, name, cost, selected, detail, stock, sold, discount, opt, finalImages);
                alert('Item edited successfully');
            }
        } catch (error) {
            alert('Error editing item');
        }
    };

    return (
        <div className="mt-16 bg-white">
            <div className="text-4xl font-semibold py-8 text-center underline underline-offset-2">Edit Product</div>
            <div className="mx-20">
                <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl pb-20"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                />
                <div className="grid grid-flow-col my-2 space-x-10 justify-stretch">
                    <select
                        name="Category"
                        className="p-6 border-2 rounded border-gray-700 text-xl"
                        value={selected}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {category.map((item) => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Price"
                        className="p-6 border-2 rounded border-gray-700 text-xl"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Stock"
                        className="p-6 border-2 rounded border-gray-700 text-xl"
                        value={stock || ""}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="grid grid-flow-col my-2 space-x-10 justify-stretch">
                    <input
                        type="text"
                        placeholder="Sold"
                        className="p-6 border-2 rounded border-gray-700 text-xl"
                        value={sold || ""}
                        onChange={(e) => setSold(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Discount"
                        className="p-6 border-2 rounded border-gray-700 text-xl"
                        value={discount || ""}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Main Picture"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"
                    value={images[0]}
                    onChange={(e) => {
                        const newImages = [...images];
                        newImages[0] = e.target.value;
                        setImages(newImages);
                    }}
                />
                <input
                    type="text"
                    placeholder="Optional Picture 1"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"
                    value={images[1]}
                    onChange={(e) => {
                        const newImages = [...images];
                        newImages[1] = e.target.value;
                        setImages(newImages);
                    }}
                />
                <input
                    type="text"
                    placeholder="Optional Picture 2"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"
                    value={images[2]}
                    onChange={(e) => {
                        const newImages = [...images];
                        newImages[2] = e.target.value;
                        setImages(newImages);
                    }}
                />
                <input
                    type="text"
                    placeholder="Optional Picture 3"
                    className="w-full p-6 border-2 rounded border-gray-700 my-2 text-xl"
                    value={images[3]}
                    onChange={(e) => {
                        const newImages = [...images];
                        newImages[3] = e.target.value;
                        setImages(newImages);
                    }}
                />
                <div className="flex flex-row my-2">
                    <button className="w-auto px-5 mr-2 h-20 text-5xl rounded border-2 border-black" onClick={() => setIsPopupOpen(true)}>+</button>
                    <div className="flex flex-row overflow-x-auto rounded">
                        {opt.map((item, index) => (
                            <div key={index} className="bg-white h-20 w-auto px-5 mx-2 text-2xl rounded border-2 border-black flex items-center justify-center">{item}</div>
                        ))}
                    </div>
                    <button className="w-auto px-6 ml-2 h-20 text-5xl rounded border-2 border-black" onClick={handleRemoveLastOption}>-</button>
                </div>
            </div>
            <div className="flex flex-row mx-32 justify-end">
                <button className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mt-16 mb-10 rounded" onClick={handleSubmit}>Edit</button>
            </div>

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
        </div>
    );
}
