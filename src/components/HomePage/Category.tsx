"use client"
import Link from 'next/link';
import Image from 'next/image';
import { category } from '@/category';

export default function Category(){
    return(
        <div>
            {/* Topic */}
            <div className="my-5 mx-5 px-2 bg-white max-h-fit">
                <div className="text-xl py-3 pl-5">Category</div>
            </div>

            {/* Category Row */}
            <div className="mx-5 px-2 bg-white max-h-fit">
                <div className="grid grid-cols-10 gap-4 p-5">
                {category.map((item) => (
                    <Link key={item.id} href={`/${item.id}`} passHref>
                        <div className="text-center">
                            <Image src={item.picture} alt={item.name} width={100} height={100} />
                            <div className="text-xs py-2">{item.name}</div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
        
    )
}