export default async function deleteItem(id:number, token:string) {
    const response = await fetch(`http://localhost:8080/store/item/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    if(!response.ok) {
        throw new Error("Cannot edit store")
    }

    return await response.json()
}