import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store'; 
import { fetchItems } from '@/redux/features/itemSlice'; 
import { Product } from '@/interfaces';
import convertImgUrl from '../ControlSystem/convertImgUrl';
import Image from 'next/image';

interface SortedProductsProps {
    sortPrice: string;
    sortChar: string;
    minPrice: string;
    maxPrice: string;
    value: string;
}

export default function SortedProducts({ sortPrice, sortChar, minPrice, maxPrice, value }: SortedProductsProps) {
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector(state => state.items);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const itemsPerPage = 16;

    let sortedProducts: Product[] = [...items];

    if (value) {
        sortedProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
    }

    if (minPrice) {
        const minPriceNumber = parseFloat(minPrice);
        sortedProducts = sortedProducts.filter(product => product.cost - (product.cost * product.discount) / 100 >= minPriceNumber);
    }

    if (maxPrice) {
        const maxPriceNumber = parseFloat(maxPrice);
        sortedProducts = sortedProducts.filter(product => product.cost - (product.cost * product.discount) / 100 <= maxPriceNumber);
    }

    if (sortPrice === 'priceLowHigh') {
        sortedProducts.sort((a, b) => (a.cost - (a.cost * a.discount) / 100) - (b.cost - (b.cost * b.discount) / 100));
    } else if (sortPrice === 'priceHighLow') {
        sortedProducts.sort((a, b) => (b.cost - (b.cost * b.discount) / 100) - (a.cost - (a.cost * a.discount) / 100));
    }

    if (sortChar) {
        sortedProducts.sort((a, b) => {
            const priceDifference = (a.cost - (a.cost * a.discount) / 100) - (b.cost - (b.cost * b.discount) / 100);
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
    }, [items, sortPrice, sortChar, minPrice, maxPrice, value]);

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
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
                    <Link key={index} href={`/product/${item.name}`} passHref>
                        <div>
                            <Image src={convertImgUrl(item.images[0])} width={1000} height={1000} alt={item.name} />
                            <div className='bg-white py-2 px-2'>
                                <div className='text-2xl'>{item.name}</div>
                                <div className='line-through text-sm pt-2 text-gray-400'>฿{item.cost}</div>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-2xl text-[#00BF7A]'>฿{item.cost - (item.cost * item.discount) / 100}</div>
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
