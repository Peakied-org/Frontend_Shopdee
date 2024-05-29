export default async function getOrders(token:string) {
    const response = await fetch("http://localhost:8080/order", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    if(!response.ok) {
        throw new Error("Cannot get order")
    }
    const data = await response.json();
    return data.body;
}