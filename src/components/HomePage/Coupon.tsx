"use client"
import { coupon } from "@/mockCoupon"
import convertImgUrl from "../ControlSystem/convertImgUrl"
import Image from "next/image"

export default function Coupon(){
    
    return(
        <div>
            <div className="my-5 mx-5 px-2 bg-white max-h-fit flex flex-row">
                {/* Coupon Topic */}
                <div className="text-2xl py-3 pl-5 content-center">Coupon</div>

                {/* Coupon List */}
                <div className="flex flex-row flex-nowrap">
                    {coupon.map((coupon) => (
                        <div key={coupon.id} className="m-4">
                            <Image src={convertImgUrl(coupon.image)} alt={coupon.name} width={250} height={250}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}