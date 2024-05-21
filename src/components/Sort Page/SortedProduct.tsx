import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { products } from '@/products';

export default function SortedProducts({ sortPrice, sortChar, minPrice, maxPrice, value }: SortedProductsProps) {
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const itemsPerPage = 16;

    let sortedProducts: Product[] = [...products];

    if (value) {
        sortedProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
    }

    if (minPrice) {
        const minPriceNumber = parseFloat(minPrice);
        sortedProducts = sortedProducts.filter(product => product.cost - product.discount >= minPriceNumber);
    }

    if (maxPrice) {
        const maxPriceNumber = parseFloat(maxPrice);
        sortedProducts = sortedProducts.filter(product => product.cost - product.discount <= maxPriceNumber);
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

    const loadMoreProducts = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            setDisplayedProducts(prevProducts => [
                ...prevProducts,
                ...sortedProducts.slice(prevProducts.length, prevProducts.length + itemsPerPage)
            ]);
            setIsLoading(false);
            setCurrentPage(prevPage => prevPage + 1);
        }, 1000);
    };

    useEffect(() => {
        setDisplayedProducts(sortedProducts.slice(0, itemsPerPage));
    }, [sortPrice, sortChar, minPrice, maxPrice, value]);

    useEffect(() => {
        const handleObserver = (entries: any[]) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreProducts();
            }
        };

        observer.current = new IntersectionObserver(handleObserver);
        const target = document.querySelector('#load-more-trigger');
        if (target) {
            observer.current.observe(target);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 px-5 bg-white">
                {displayedProducts.map((item, index) => (
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
            {isLoading && <div className="text-center py-5">Loading...</div>}
            <div id="load-more-trigger" className="h-5"></div>
        </div>
    );
}
