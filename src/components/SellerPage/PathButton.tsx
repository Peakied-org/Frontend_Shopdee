"use client"
import Link from "next/link"
import { mockStore } from "@/mockStore";

export default function PathButton({ sid }: { sid: number }){
    const store = mockStore.find(store => store.id === Number(sid));

    return(
        <div className="flex flex-row place-content-center">
            <Link href={`/store/${store?.id}/addItem/`} passHref>
                <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5">Add Product</div>
            </Link>
            <Link href={`/`} passHref>
                <div className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mx-14 my-5">View Order</div>
            </Link>
        </div>
    )
}