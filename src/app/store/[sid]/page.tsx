import PathButton from "@/components/SellerPage/PathButton";
import SellerDetail from "@/components/SellerPage/SellerDetail"
import SellerDetailEdit from "@/components/SellerPage/SellerDetailEdit";
import StoreProduct from "@/components/SellerPage/StoreProduct";
import StoreProductDetail from "@/components/SellerPage/StoreProductDetail";

interface Params {
    sid: number;
}

export default function SellerPage({ params }: { params: Params }){
    return(
        <main>
            <SellerDetailEdit/>
            <SellerDetail sid={params.sid}/>
            <StoreProduct sid={params.sid}/>
            <StoreProductDetail sid={params.sid}/>
            <PathButton sid={params.sid}/>
        </main>
    )
}