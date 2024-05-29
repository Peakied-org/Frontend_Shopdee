"use client";
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import getItem from '@/lib/getItem';
import { useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/features/cartSlice';
import convertImgUrl from '../ControlSystem/convertImgUrl';
import Image from 'next/image';

export default function ProductBox({ pid }: { pid: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgNum, setImgNum] = useState(0);
  const [count, setCount] = useState(1);
  const [activeChoice, setActiveChoice] = useState<number>(0);
  const [activeImage, setActiveImage] = useState<number | null>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getItem(pid);
        setProduct(data);
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
    return <div className='mt-12 p-4'>No product found</div>;
  }

  console.log(product);

  let discountedCost: number | undefined;
  if (product) {
    discountedCost = product.cost - (product.cost * product.discount) / 100;
  }

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      toast.error("Item can't be less than 1");
    }
  };

  const incrementCount = () => {
    if (product && count < product.stock) {
      setCount(count + 1);
    } else {
      toast.error("Item can't be more than stock");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        cost: product.cost,
        discount: product.discount,
        quantity: count,
        picture: product.images[0],
        type: product.types[activeChoice]
      }));
      toast.success("Item added to cart");
    }
  };

  return (
    <div className="mt-10 mx-5 bg-white max-h-fit">
      <div className="grid grid-cols-2 gap-10">
        {/* Image */}
        <div>
          {/* Main Picture */}
          <div className="pt-10 pl-10 pb-5">
            <Image src={convertImgUrl(product.images[imgNum])} alt={product.name} width={1200} height={1200} className="max-w-[40rem] h-auto w-[32vw]" />
          </div>
          {/* Optional Picture */}
          <div className="flex flex-row pl-10 pb-10">
            {product.images.map((pic, index) => (
              <Image
                key={index}
                src={convertImgUrl(pic)}
                alt={pic}
                width={1000} height={1000}
                className={`max-w-[10rem] cursor-pointer w-[8vw] h-auto ${activeImage === index ? 'border-4 border-black' : ''}`}
                onClick={() => {setActiveImage(index); setImgNum(index)}}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="pt-10">
          {/* Product Name */}
          <div className="text-5xl font-semibold mt-10">{product.name}</div>
          <div className='flex flex-row my-5 mr-16 bg-gray-200 p-5 gap-10 place-content-start'>
            {/* Product Price */}
            <div className="text-3xl self-center">{discountedCost} ฿</div>
            {/* Discount */}
            <div className="text-2xl text-red-500 self-center">{product.discount}% Sale!</div>
          </div>
          
          {/* Count */}
          <div className="flex flex-row pt-7 items-center">
            <div className="pr-3 text-xl">จำนวน</div>
            <div className="flex flex-row items-center bg-gray-200 place-content-center">
              <button className="px-3 cursor-pointer text-2xl border border-black" onClick={decrementCount}>-</button>
              <div className="px-12 text-2xl border border-black">{count}</div>
              <button className="px-3 cursor-pointer text-2xl border border-black" onClick={incrementCount}>+</button>
            </div>
            <div className="text-xl pl-3">มีสินค้าทั้งหมด {product.stock} ชิ้น</div>
          </div>
          {/* Choice */}
          <div className="flex flex-row pt-6 items-center">
            <div className="pr-3 text-xl">ตัวเลือก</div>
            <div className="grid grid-cols-4">
              {product.types.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChoice(index)}
                  className={`m-2 py-3 px-7 place-content-center text-center max-h-md border border-black ${activeChoice === index ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
          {/* Add To Cart */}
          <div className="pt-10">
            <button onClick={handleAddToCart} className="py-3 px-9 bg-[#00BF7A] text-2xl text-white font-bold tracking-wider rounded">Add To Cart</button>
          </div>
        </div>
        <Toaster />
      </div>
      {/* Description */}
      <div className="mx-8 max-h-fit pb-5">
        <div className="bg-gray-200 py-3 pl-5 text-2xl">รายละเอียดสินค้า</div>
      </div>
      <div className="mx-8 max-h-fit pb-10">
        <div className="bg-gray-200 py-3 pl-5 text-2xl">{product.detail}</div>
      </div>
    </div>
  );
}
