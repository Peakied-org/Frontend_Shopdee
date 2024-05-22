import CartItems from "@/components/CartPage/CartItems"
import NavBar from "@/components/ControlSystem/NoSearchNavBar"
import RecommendedProducts from "@/components/HomePage/RecommendedProducts"


export default function Cart() {


    return (
        <main>
            <NavBar/>
            <div className="mt-16"></div>
            <CartItems/>
            <RecommendedProducts/>
        </main>
    )
}