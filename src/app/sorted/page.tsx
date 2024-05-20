'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SortFilter from '@/components/Sort Page/SortFilter';
import SortedProducts from '@/components/Sort Page/SortedProduct';

export default function SortedPage() {
    const searchParams = useSearchParams();
    let query = searchParams.get('query') || '';

    const [sortPrice, setSortPrice] = useState('');
    const [sortChar, setSortChar] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleConfirm = (newSortPrice: string, newSortChar: string, newMinPrice: string, newMaxPrice: string) => {
        setSortPrice(newSortPrice);
        setSortChar(newSortChar);
        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
    };

    return (
        <main className="p-16">
            <SortFilter
                value={query}
                onConfirm={handleConfirm}
            />
            <SortedProducts
                value={query}
                sortPrice={sortPrice}
                sortChar={sortChar}
                minPrice={minPrice}
                maxPrice={maxPrice}
            />
        </main>
    );
}
