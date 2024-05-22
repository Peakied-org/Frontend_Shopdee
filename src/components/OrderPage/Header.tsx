

export default function OrderHeader(){
    return(
        <div className="flex justify-center flex-col items-center">
            <div className="text-custom-green text-4xl text-center p-6 bg-white max-h-fit w-[90vw]">
                Your Order
            </div>
            <div className="bg-white p-4 mb-4 mt-6 w-[60%] flex justify-between">
                <div className="font-semibold text-center w-1/2 text-lg">Product</div>
                <div className="font-semibold text-center w-1/2 text-lg ml-auto">Total Price</div>
            </div>
        </div>
    )
}
