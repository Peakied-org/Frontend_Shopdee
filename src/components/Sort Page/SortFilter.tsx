'use client';
import React, { useState } from 'react';

export default function SortFilter({
    value,
    onConfirm
}: {
    value: string,
    onConfirm: (sortPrice: string, sortChar: string, minPrice: string, maxPrice: string) => void
}) {
    const [localSortPrice, setLocalSortPrice] = useState('');
    const [localSortChar, setLocalSortChar] = useState('');
    const [localMinPrice, setLocalMinPrice] = useState('');
    const [localMaxPrice, setLocalMaxPrice] = useState('');

    const handleSortPriceChange = (e: any) => {
        setLocalSortPrice(e.target.value);
    };

    const handleSortCharChange = (e: any) => {
        setLocalSortChar(e.target.value);
    };

    const handleMinPriceChange = (e: any) => {
        setLocalMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e: any) => {
        setLocalMaxPrice(e.target.value);
    };

    const handleConfirmClick = () => {
        onConfirm(localSortPrice, localSortChar, localMinPrice, localMaxPrice);
    };

    return (
        <div className="bg-white p-10">
            <p className="text-center text-3xl text-custom-green">From Search "{value}"</p>
            <p className="flex justify-between p-4 text-xl">
                Sort by:
                <select value={localSortPrice} onChange={handleSortPriceChange} className="w-[40%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-slate-200">
                    <option value="">Price</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                </select>
                <select value={localSortChar} onChange={handleSortCharChange} className="w-[40%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-slate-200">
                    <option value="">Character</option>
                    <option value="a2z">a-z</option>
                    <option value="z2a">z-a</option>
                </select>
            </p>
            <p className="flex justify-between p-4 text-xl space-x-2 items-center">
                Price Range:
                <input type="number" placeholder="Min price" value={localMinPrice} onChange={handleMinPriceChange} className="w-[30%] px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-slate-200" />
                -                   
                <input type="number" placeholder="Max price" value={localMaxPrice} onChange={handleMaxPriceChange} className="w-[30%] px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-slate-200" />
                <button onClick={handleConfirmClick} className="bg-custom-green text-white rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green">Confirm</button>
            </p>
        </div>
    );
}
