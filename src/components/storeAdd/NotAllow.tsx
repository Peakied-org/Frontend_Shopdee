'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotAllow(){

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return(
        <div className="flex flex-col place-items-center my-60 gap-5">
            <div className="text-5xl">Not Allowed</div>
            <div className="text-3xl">You do not have permission to access this resource.</div>
        </div>
    )
}