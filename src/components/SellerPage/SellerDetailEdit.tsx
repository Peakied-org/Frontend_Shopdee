"use client"
export default function SellerDetailEdit(){
    return (
        <div className="mt-16 bg-white">
            <div className="grid grid-cols-2">
                {/* LeftSide */}
                <div>
                    <div className="pt-10 pl-7 text-4xl font-semibold">Edit Your Shop Profile</div>
                    <div className="py-2 pl-7 text-2xl">Manage Your Profile</div>
                    <div className="grid grid-cols-2 gap-5">
                        {/* profileImg */}
                        <div className="flex flex-col items-center place-content-center">
                            <img src="/img/profileIcon.png" alt="profileIcon" className="bg-gray-400 rounded-full p-4 my-5 max-h-52"/>
                            <button className="border-2 border-gray-400 rounded py-2 px-5">Select Image</button>
                            <div className="my-5 text-gray-400">
                                <div>File size: maximum 1 MB</div>
                                <div>File extension: .JPEG, .PNG</div>
                            </div>
                        </div>

                        {/* bannerImg */}
                        <div className="flex flex-col items-center place-content-center">
                            <div className="bg-gray-400 text-white font-bold text-5xl rounded px-28 py-10 my-5 max-h-52">+</div>
                            <button className="border-2 border-gray-400 rounded py-2 px-5">Select Image</button>
                            <div className="my-5 text-gray-400">
                                <div>File size: maximum 1 MB</div>
                                <div>File extension: .JPEG, .PNG</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RightSide */}
                <div className="flex flex-col justify-center items-center">
                    {/* EditData */}
                    <div className="flex flex-col place-content-center items-center w-full">
                        <input type="text" placeholder="Shop Name" className="w-4/6 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <input type="text" placeholder="Description" className="w-4/6 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <div className="w-4/6 flex justify-end">
                            <button className="bg-[#00BF7A] px-12 py-3 rounded text-white font-semibold text-2xl">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
