import CartItems from "@/components/CartPage/CartItems"
import RecommendedProducts from "@/components/HomePage/RecommendedProducts"


export default function Cart() {


    return (
        <main className="p-16">
            <CartItems/>
            <RecommendedProducts/>
        </main>
    )
}