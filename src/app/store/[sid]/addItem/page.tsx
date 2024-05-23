import AddItem from "@/components/AddItem/AddItem";

interface Params {
    sid: number;
}

export default function addItem({ params }: { params: Params }){

    return(
        <main>
            <AddItem sid={params.sid}/>
        </main>
    )
}