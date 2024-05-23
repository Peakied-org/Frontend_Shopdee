"use client"
import { mockStore } from "@/mockStore";
import { products } from "@/products";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";

export default function StoreProductDetail({ sid }: { sid: number }) {
    const store = mockStore.find(store => store.id === Number(sid));
    const storeProductIds = store?.item;

    return (
        <div className="mt-10">
            <div className="bg-white font-semibold text-3xl py-6 text-center">Your Product</div>
            <div className="">
                {products.map((item) => (
                    storeProductIds?.includes(item.id) ? (
                        <div key={item.id} className="bg-white my-6 grid grid-cols-5 relative">
                            <img src={item.picture[0]} alt={item.name} className="p-6"/>
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
                                <FaPencilAlt color="gray" size={32} />
                                <button className="bg-[#00BF7A] px-12 py-3 rounded text-white font-semibold text-2xl my-4 mr-10">View</button>
                                <RiDeleteBin6Fill color="red" size={32} />
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    )
}
