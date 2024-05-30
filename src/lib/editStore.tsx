export default async function editStore(id:number, token:string, name:string|null, detail:string|null, image:string|null, banner:string|null) {
    const response = await fetch(`${process.env.BACKEND_URL}/store/${id}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            detail: detail,
            image: image,
            banner: banner
        }),
    })

    if(!response.ok) {
        throw new Error("Cannot edit store")
    }

    return await response.json()
}