

export default function OrderHeader(){
    return(
        <div className="flex justify-center flex-col items-center">
            <div className="text-custom-green text-4xl text-center p-6 bg-white max-h-fit w-[90vw]">
                Your Order
            </div>
            <div className="bg-white p-3 m-4 w-[70%] grid grid-cols-3 gap-4 items-center font-semibold">
                <div className="col-span-2 text-center text-lg">Product</div>
                <div className="col-span-1 text-lg">Total Price</div>
            </div>
        </div>
    )
}
