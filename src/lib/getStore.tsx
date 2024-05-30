export default async function getStores() {
    const response = await fetch(`${process.env.BACKEND_URL}/store`);
    if (!response.ok) {
        throw new Error("Failed to fetch Store");
    }
    const data = await response.json();
    return data.body;
}   