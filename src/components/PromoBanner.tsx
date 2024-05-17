'use client'
import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './SlidingTransition.css';


export default function PromoBanner(){

    const [currentImage, setCurrentImage] = useState('/img/promotion_big_1.png');
  
    useEffect(() => {
    const images = ['/img/promotion_big_1.png', '/img/promotion_small_1.png', '/img/promotion_small_2.png'];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);
    return(
        <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
            <img className="w-full h-[30vh] object-cover mb-2" src="/img/promotion_small_1.png" alt="Small Image 1" />
            <img className="w-full h-[30vh] object-cover" src="/img/promotion_small_2.png" alt="Small Image 2" />
        </div>
        <div className="col-span-3 relative h-[61vh] overflow-hidden">
            <TransitionGroup>
                <CSSTransition key={currentImage} timeout={500} classNames="slide">
                    <img className="w-full h-[61vh] object-cover absolute" src={currentImage} alt="Large Image" />
                </CSSTransition>
            </TransitionGroup>
        </div>
      </div>
    )
}