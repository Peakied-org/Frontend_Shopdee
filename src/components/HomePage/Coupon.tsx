"use client"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchCoupons } from "@/redux/features/couponSlice";
import convertImgUrl from "../ControlSystem/convertImgUrl";
import Image from "next/image";

export default function Coupon(){
    const dispatch = useAppDispatch();
    const { coupons, loading, error } = useAppSelector((state) => state.coupons);

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <div>
            <div className="my-5 mx-5 px-2 bg-white max-h-fit flex flex-row">
                {/* Coupon Topic */}
                <div className="text-2xl py-3 pl-5 content-center font-bold">Coupon</div>

                {/* Coupon List */}
                <div className="flex flex-row flex-nowrap overflow-x-auto">
                    {coupons.map((coupon) => (
                        <Image key={coupon.id} src={convertImgUrl(coupon.image)} alt={coupon.name} width={250} height={200} className="m-5 rounded"/>
                    ))}
                </div>
            </div>
        </div>
    )
}
