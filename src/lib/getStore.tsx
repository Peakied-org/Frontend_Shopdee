export default async function getStores() {
    const response = await fetch("http://localhost:8080/store");
    if (!response.ok) {
        throw new Error("Failed to fetch Store");
    }
    const data = await response.json();
    return data.body;
}   