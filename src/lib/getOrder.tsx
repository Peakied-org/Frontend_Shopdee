export default async function getOrders(token: string) {
    console.log("Fetching orders with token:", token);
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/order`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`Cannot get order: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}
    