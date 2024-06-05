import RecommendedProducts from "@/components/HomePage/RecommendedProducts";
import ProductBox from "@/components/ProductPage/ProductBox";
import ViewStore from "@/components/ProductPage/ViewStore";
interface Params {
    pid: number;
}

export default function product({ params }: { params: Params }) {

    return (
        <main>
            <ProductBox pid={params.pid} />
            <ViewStore pid={params.pid}/>
            <RecommendedProducts/>
        </main>
    )
}