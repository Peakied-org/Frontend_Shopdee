'use client'
import { useState, useEffect } from 'react';
import NavBar from "@/components/ControlSystem/NoSearchNavBar";
import { useSearchParams } from "next/navigation";

export default function Payment(){
    const totalPrice = useSearchParams().get('price');
    const [timeLeft, setTimeLeft] = useState(5 * 60);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return(
        <main>
            <NavBar/>
            <div className="mt-16 text-2xl text-center">
                Payment Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className="flex justify-center p-6">
                <img src="/img/PromptPay.png" alt="qr code" className="w-[30%]"/>
            </div>
            <div className="text-lg text-center">Total amount: {totalPrice} ฿</div>
        </main>
    )
}
