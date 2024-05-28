export default async function getStores() {
    try {
        const response = await fetch("http://localhost:8080/store");
        if (!response.ok) {
            throw new Error("Failed to fetch store");
        }
        const data = await response.json();
        return data.body;
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
    }
}
