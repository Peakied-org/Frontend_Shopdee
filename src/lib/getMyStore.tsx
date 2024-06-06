export default async function getMyStore() {
    const response = await fetch(`${process.env.BACKEND_URL}/store/me`);
    if (!response.ok) {
        throw new Error("Failed to fetch My Store");
    }
    const data = await response.json();
    return data.body;
}