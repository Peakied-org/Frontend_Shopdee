import ProductCategory from "@/components/Category/ProductCategory";

interface Params {
    cid: number;
}

export default function category({ params }: { params: Params }){
    return(
        <main className="mt-20">
            <ProductCategory cid={params.cid}/>
        </main>
    )
}