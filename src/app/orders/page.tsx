import OrderHeader from "@/components/OrderPage/Header";
import OrderList from "@/components/OrderPage/OrderList";


export default function Orders(){


    return(
        <main className="mt-10">
            <OrderHeader/>
            <OrderList/>
        </main>
    )
}