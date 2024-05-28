export default async function getItems() {
    const response = await fetch(`http://localhost:8080/item`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.body;
}
