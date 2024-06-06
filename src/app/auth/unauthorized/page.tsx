import TopMenu from "@/components/ControlSystem/NoSearchNavBar"

export default function notPermit(){

    return(
        <main>
            <TopMenu/>
            <div className="mt-16">You have no permission in this page</div>
        </main>
    )
}