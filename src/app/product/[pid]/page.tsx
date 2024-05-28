import RecommendedProducts from "@/components/HomePage/RecommendedProducts";
import ProductBox from "@/components/ProductPage/ProductBox";
import ViewStore from "@/components/ProductPage/ViewStore";
import { Toaster } from "react-hot-toast";

interface Params {
    pid: number;
}

export default function product({ params }: { params: Params }) {

    return (
        <main>
            <ProductBox pid={params.pid} />
            {/* <ViewStore pid={params.pid}/> */}
            <RecommendedProducts/>
            <Toaster position="bottom-right"/>
        </main>
    )
}