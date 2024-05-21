import React from 'react';
import Link from 'next/link';
import { products } from '@/products';
import { Product } from '@/interfaces';

export default function RecommendedProducts() {
  // Shuffle the products array
  const shuffledProducts = shuffleArray(products);

  function shuffleArray(array: Product[]): Product[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  return (
    <div>
      {/* Topic */}
      <div className="my-5 mx-5 px-2 bg-white max-h-fit">
        <div className="text-2xl py-3 pl-5 text-center">Recommended Products</div>
      </div>
      {/* Products */}
      <div className="grid grid-cols-4 gap-4 px-5">
        {shuffledProducts.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} passHref>
            <div>
              <img src={item.picture[0]} alt={item.name}/>
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
