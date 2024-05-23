"use client"
import { mockStore } from "@/mockStore";

export default function SellerPage({ sid }: { sid: number }){
    const store = mockStore.find(store => store.id === Number(sid));

    return(
        <div className="mt-16 bg-white">
            <div className="py-10 pl-7 text-4xl font-semibold">{store?.name}</div>
            <img src={`${store?.banner}`} className="px-20"></img>
            <div className="pt-10 pl-7 text-3xl font-semibold">Description</div>
            <div className="py-7 pl-12 text-xl ">{store?.detail}</div>
        </div>
    )
}