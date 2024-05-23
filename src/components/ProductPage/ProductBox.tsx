"use client"
import { useState } from 'react';
import { products } from '@/products';
import { Toaster, toast } from 'react-hot-toast';

export default function ProductBox({ pid }: { pid: number }) {
  const product = products.find(product => product.id === Number(pid));

  console.log(product)

  let discountedCost: number | undefined;
  if (product) {
    discountedCost = product.cost - (product.cost * product.discount) / 100;
  }

  const [imgNum, setImgNum] = useState(0);
  const [count, setCount] = useState(1);
  const [activeChoice, setActiveChoice] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(0);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      return toast.error("Item can't be less than 1");
    }
  };

  const incrementCount = () => {
    if (product && count < product.stock) {
      setCount(count + 1);
    } else {
      return toast.error("Item can't be more than stock");
    }
  };

  return (
    <div className='mt-10 mx-5 bg-white max-h-fit'>
      <div className="grid grid-cols-2 gap-10">
        {/* Image */}
        <div>
          {/* Main Picture */}
          <div className='pt-10 pl-10 pb-5'>
            <img src={product?.picture[imgNum]} alt={product?.name} className='max-w-[40rem]' />
          </div>
          {/* Optional Picture */}
          <div className='flex flex-row pl-10 pb-10'>
            {product?.picture.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product?.name}
                className={`max-w-[10rem] cursor-pointer border-2 ${
                  activeImage === index ? 'brightness-75' : 'brightness-100'
                }`}
                onClick={() => {
                  setImgNum(index);
                  setActiveImage(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Detail */}
        <div className='pt-14 pr-10'>
          {/* Name */}
          <div className='text-5xl pb-2'>{product?.name}</div>
          {/* Sold */}
          <div className='pb-2 text-2xl pl-5'>ขายแล้ว {product?.sold} ชิ้น</div>
          {/* Cost */}
          <div className="flex flex-row bg-gray-200 max-h-fit py-5">
            <div className='text-xl line-through text-gray-500 pl-4 place-content-center'>฿{product?.cost}</div>
            <div className='text-5xl place-content-center pl-5 pr-7 tracking-wider text-[#00BF7A] font-bold'>฿{discountedCost}</div>
            <div className='text-2xl text-white font-bold place-content-center px-3 py-2 bg-[#00BF7A]'>{product?.discount}% Sale!</div>
          </div>
          {/* Count */}
          <div className='flex flex-row pt-7 items-center'>
            <div className='pr-3 text-xl'>จำนวน</div>
            <div className='flex flex-row items-center bg-gray-200 place-content-center'>
              <button className='px-3 cursor-pointer text-2xl border border-black' onClick={decrementCount}>-</button>
              <div className='px-12 text-2xl border border-black'>{count}</div>
              <button className='px-3 cursor-pointer text-2xl border border-black' onClick={incrementCount}>+</button>
            </div>
            <div className='text-xl pl-3'>มีสินค้าทั้งหมด {product?.stock} ชิ้น</div>
          </div>
          {/* Choice */}
          <div className='flex flex-row pt-6 items-center'>
            <div className='pr-3 text-xl'>ตัวเลือก</div>
            <div className="grid grid-cols-4">
              {product?.choice.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChoice(index)}
                  className={`m-2 py-3 px-7 place-content-center text-center max-h-md border border-black ${
                    activeChoice === index ? 'bg-gray-400 text-white' : 'bg-gray-200'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
          {/* Add To Cart */}
          <div className='pt-10'>
            <button className='py-3 px-9 bg-[#00BF7A] text-2xl text-white font-bold tracking-wider rounded'>Add To Cart</button>
          </div>
        </div>
        <Toaster />
      </div>
      {/* Description */}
      <div className="mx-8 max-h-fit pb-5">
        <div className='bg-gray-200 py-3 pl-5 text-2xl'>รายละเอียดสินค้า</div>
      </div>
      <div className="mx-8 max-h-fit pb-10">
        <div className='bg-gray-200 py-3 pl-5 text-2xl'>{product?.description}</div>
      </div>
    </div>
  );
}
