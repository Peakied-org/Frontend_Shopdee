'use client'
import Link from 'next/link';
import getItem from '@/lib/getItem';
import { useState, useEffect } from 'react';
import getStores from '@/lib/getStore';
import convertImgUrl from '../ControlSystem/convertImgUrl';
import Image from 'next/image';

export default function ViewStore({ pid }: { pid: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
      const fetchProductAndStores = async () => {
          try {
              const productData = await getItem(pid);
              setProduct(productData.body);

              const storesData = await getStores();
              setStores(storesData);

              const matchedStore = storesData.find((store: { id: number; }) => store.id === productData.body.storeID);
              setStore(matchedStore || null);
          } catch (error) {
              console.error('Error fetching product or stores:', error);
          }
      };

      fetchProductAndStores();
  }, [pid]);

  if (product == null || store == null) {
      return null;
  }

    return (
        <div className='mt-5 mx-5 bg-white max-h-fit px-10 py-5 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <Image className='brightness-50 max-h-20' width={50} height={50} src={convertImgUrl(store.image)} alt={store.name} />
                <div className='text-2xl font-semibold place-content-center pl-6'>{store.name}</div>
            </div>
            <Link key={product.id} href={`/store/${store.id}`}>
                <button className='bg-[#00BF7A] px-12 my-3 rounded text-white font-bold text-2xl'>View</button>
            </Link>
        </div>
    );
}
