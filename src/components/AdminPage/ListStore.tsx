"use client"
import { mockStore } from "@/mockStore";
import Link from "next/link";

export default function ListStore() {
    return (
        <div className="mt-10">
            {mockStore.map((item) => (
                <div key={item.id} className="bg-white my-6 flex flex-row p-4 shadow-md rounded-md items-center justify-between">
                    <div className="flex flex-row  items-center">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover brightness-50"/>
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
