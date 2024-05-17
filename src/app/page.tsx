import React from 'react';
import Category from '@/components/Category';
import Coupon from '@/components/Coupon';
import PromoBanner from '@/components/PromoBanner';
import RecommendedProducts from '@/components/RecommendedProducts';

export default function Home() {
  
  return (
    <main className="p-16">
      <PromoBanner/>
      <Category></Category>
      <Coupon></Coupon>
      <RecommendedProducts></RecommendedProducts>
    </main>
  );
}

