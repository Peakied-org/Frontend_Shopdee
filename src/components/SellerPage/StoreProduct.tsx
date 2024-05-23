"use client"
import { mockStore } from "@/mockStore";
import { products } from "@/products";
import Link from "next/link";

export default function StoreProduct({ sid }: { sid: number }) {
    const store = mockStore.find(store => store.id === Number(sid));
    const storeProductIds = store?.item;

    return (
        <div className="mt-10">
            <div className="grid grid-cols-4 gap-4 px-5">
                {products.map((item) => (
                    storeProductIds?.includes(item.id) ? (
                        <Link key={item.id} href={`/product/${item.id}`} passHref>
                            <img src={item.picture[0]} alt={item.name} />
                            <div className='bg-white py-2 px-2'>
                                <div className='text-2xl'>{item.name}</div>
                                <div className='line-through text-sm pt-2 text-gray-400'>฿{item.cost}</div>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-2xl text-[#00BF7A]'>฿{(item.cost - item.cost * (item.discount / 100)).toFixed(2)}</div>
                                    <div className=''>ขายแล้ว {item.sold} ชิ้น</div>
                                </div>
                            </div>
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
    )
}