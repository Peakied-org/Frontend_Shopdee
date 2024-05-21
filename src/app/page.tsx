import React from 'react';
import Category from '@/components/HomePage/Category';
import Coupon from '@/components/HomePage/Coupon';
import PromoBanner from '@/components/HomePage/PromoBanner';
import RecommendedProducts from '@/components/HomePage/RecommendedProducts';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  
  return (
    <main className="p-16">
      <PromoBanner/>
      <Category/>
      <Coupon/>
      <RecommendedProducts/>
      <Toaster />
    </main>
  );
}

