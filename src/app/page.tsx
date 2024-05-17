import React from 'react';
import Category from '@/components/Home Page/Category';
import Coupon from '@/components/Home Page/Coupon';
import PromoBanner from '@/components/Home Page/PromoBanner';
import RecommendedProducts from '@/components/Home Page/RecommendedProducts';
import Footer from '@/components/ControlSystem/Footer';

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

