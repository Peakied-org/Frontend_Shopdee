import Link from 'next/link';
import { products } from '@/products';

export default function RecommendedProducts() {
  // Shuffle the products array
  const shuffledProducts = shuffleArray();

  function shuffleArray() {
    const shuffledArray = [...products];
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
        {shuffledProducts.map((item, index) => (
          <Link key={index} href={item.name}>
            <div>
              <img src={item.picture[0]} alt={item.name} />
              <div className='bg-white py-2 px-2'>
                <div className='text-2xl'>{item.name}</div>
                <div className='line-through text-sm pt-2 text-gray-400'>฿{item.cost}</div>                
                <div className='flex flex-row justify-between'>
                  <div className='text-2xl text-[#00BF7A]'>฿{item.cost - item.discount}</div>
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