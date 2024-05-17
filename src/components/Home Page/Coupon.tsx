import { coupon } from "@/mockCoupon"

export default function Coupon(){
    return(
        <div>
            <div className="my-5 mx-5 px-2 bg-white max-h-fit flex flex-row"> 

                {/* Coupon Topic */}
                <div className="text-2xl py-3 pl-5 content-center">Coupon</div>

                {/* Coupon List */}
                <div className="flex overflow-x-auto">
                    {coupon.map((cat) => (
                        <div key={cat.name} className="bg-[#70E9BE] m-3 p-2 rounded min-w-max">
                            <div className="bg-gray-200 p-1 rounded">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-xl self-center">{cat.name}</div>
                                    <div className="text-5xl self-center text-red-500">{cat.discount}%</div>
                                </div>
                                <div className="flex pt-2">
                                    <div className="px-1">{cat.start_date}</div>
                                    <div className="px-1">-</div>
                                    <div className="px-1">{cat.expiry_date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}