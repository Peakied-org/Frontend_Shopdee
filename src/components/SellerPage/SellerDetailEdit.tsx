"use client"
export default function SellerDetailEdit(){
    return (
        <div className="mt-16 bg-white">
            <div className="pt-10 pl-7 text-4xl font-semibold my-10">Edit Your Shop Profile</div>
            <div className="grid grid-cols-2">
                {/* LeftSide */}
                    <div className="flex flex-col place-content-center items-center w-full">
                        <input type="text" placeholder="Shop Name" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <input type="text" placeholder="Description" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                    </div>
                {/* RightSide */}
                    <div className="flex flex-col place-content-center items-center w-full">
                        <input type="text" placeholder="Profile Image" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                        <input type="text" placeholder="Banner Image" className="w-10/12 p-6 border-2 rounded border-gray-700 my-5 text-xl"/>
                    </div>
            </div>
            <div className="flex flex-row mx-32 justify-end">
                <button className="bg-[#00BF7A] px-12 py-3 text-2xl text-white font-semibold mt-10 mb-10 rounded">Save</button>
            </div>
        </div>
    )
}
