export default async function getMyStore(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/store/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch My Store");
    }
    const data = await response.json();
    return data.body;
}