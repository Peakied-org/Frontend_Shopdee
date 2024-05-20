import Link from 'next/link';
import { products } from '@/products';

export default function SortedProducts({ sortPrice, sortChar, minPrice, maxPrice }: {
    sortPrice: string,
    sortChar: string,
    minPrice: string,
    maxPrice: string
}) {
    let sortedProducts = [...products];

    if (minPrice) {
        sortedProducts = sortedProducts.filter(product => product.cost - product.discount >= parseFloat(minPrice));
    }
    if (maxPrice) {
        sortedProducts = sortedProducts.filter(product => product.cost - product.discount <= parseFloat(maxPrice));
    }

    if (sortPrice === 'priceLowHigh') {
        sortedProducts.sort((a, b) => (a.cost - a.discount) - (b.cost - b.discount));
    } else if (sortPrice === 'priceHighLow') {
        sortedProducts.sort((a, b) => (b.cost - b.discount) - (a.cost - a.discount));
    }
    
    if (sortChar) {
        sortedProducts.sort((a, b) => {
            const priceDifference = (a.cost - a.discount) - (b.cost - b.discount);
            if (priceDifference === 0) {
                if (sortChar === 'a2z') {
                    return a.name.localeCompare(b.name);
                } else if (sortChar === 'z2a') {
                    return b.name.localeCompare(a.name);
                }
            }
            return 0;
        });
    }
    
    if (sortPrice === 'priceLowHigh') {
        sortedProducts.sort((a, b) => (a.cost - a.discount) - (b.cost - b.discount));
    } else if (sortPrice === 'priceHighLow') {
        sortedProducts.sort((a, b) => (b.cost - b.discount) - (a.cost - a.discount));
    }
    

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 px-5 bg-white">
                {sortedProducts.map((item, index) => (
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
