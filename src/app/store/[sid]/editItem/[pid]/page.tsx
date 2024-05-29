import EditItem from "@/components/EditItem/EditItem";

interface Params {
    sid: number;
    pid: number;
}

export default function editItem({ params }: { params: Params }){

    return(
        <main>
            <EditItem sid={params.pid}/>
        </main>
    )
}