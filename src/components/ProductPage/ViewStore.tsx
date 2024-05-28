"use client"
import Link from 'next/link';
import getItem from '@/lib/getItem';
import { useState, useEffect } from 'react';

export default function ViewStore({ pid }: { pid: number }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const data = await getItem(pid);
            setProduct(data.body);
          } catch (error) {
            console.error('Error fetching product:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProduct();
      }, [pid]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (product == null) {
        return null
      }

    return(
        <div className='mt-5 mx-5 bg-white max-h-fit px-10 py-5 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <img className='brightness-50 max-h-20' src={product?.storeId.image} alt={product?.storeId.name} />
                <div className='text-2xl font-semibold place-content-center pl-6'>{product?.storeId.name}</div> 
            </div>
            <Link key={product?.id} href={`/store/${product?.storeId.id}`}>
                <button className='bg-[#00BF7A] px-12 my-3 rounded text-white font-bold text-2xl'>View</button>
            </Link>
        </div>
    )
}