import EditItem from "@/components/EditItem/EditItem";

interface Params {
    sid: number;
}

export default function addItem({ params }: { params: Params }){

    return(
        <main>
            <EditItem sid={params.sid}/>
        </main>
    )
}