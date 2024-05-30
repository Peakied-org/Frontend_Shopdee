export default async function addOrder(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/order`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    if(!response.ok) {
        throw new Error("Cannot edit store")
    }

    return await response.json()
    
}