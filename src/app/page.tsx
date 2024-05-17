import React from 'react';
import Category from '@/components/Category';
import Coupon from '@/components/Coupon';
import PromoBanner from '@/components/PromoBanner';

export default function Home() {
  
  return (
    <main className="p-16">
      <PromoBanner/>
      <Category></Category>
      <Coupon></Coupon>
    </main>
  );
}

