"use client";

import { useEffect } from "react";
import { category } from "@/category";
import Image from "next/image";
import convertImgUrl from "../ControlSystem/convertImgUrl";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchItems } from "@/redux/features/itemSlice";

interface ProductCategoryProps {
    cid: number;
}

export default function ProductCategory({ cid }: ProductCategoryProps) {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.items);

    const categoryItem = category.find((c) => c.id === Number(cid));
    const categoryName = categoryItem?.name;

    useEffect(() => {
        if (categoryName) {
            dispatch(fetchItems());
        }
    }, [dispatch, categoryName]);

    const filteredItems = items.filter((item) => item.category === categoryName);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Topic */}
            <div className="my-5 mx-5 px-2 bg-white max-h-fit">
                <div className="text-2xl py-3 pl-5 text-center"> {categoryName} - Products</div>
            </div>
            {/* Products */}
            <div className="grid grid-cols-4 gap-4 px-5">
                {filteredItems.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} passHref>
                        <div>
                            <Image src={convertImgUrl(item.images[0])} alt={item.name} width={1000} height={1000}/>
                            <div className='bg-white py-2 px-2'>
                                <div className='text-2xl'>{item.name}</div>
                                <div className='line-through text-sm pt-2 text-gray-400'>฿{item.cost}</div>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-2xl text-[#00BF7A]'>฿{(item.cost - item.cost * (item.discount / 100)).toFixed(2)}</div>
                                    <div className=''>ขายแล้ว {item.sold} ชิ้น</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
