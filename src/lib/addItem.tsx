export default async function addItem(id:number, token:string, name:string, cost:string, category:string, detail:string,
    stock:string|null, sold:string|null, discount:string|null, types:string[]|null, image:string[]) {
    const response = await fetch(`${process.env.BACKEND_URL}/store/${id}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            cost: cost,
            category: category,
            detail: detail,
            stock: stock,
            sold: sold,
            discount: discount,
            types: types,
            images: image
        }),
    })

    if(!response.ok) {
        throw new Error("Cannot edit store")
    }

    return await response.json()
}