export default async function getItem(id:number) {

    const response = await fetch(`http://localhost:8080/item/${id}`,)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    const data = await response.json();
    return data.body;
} 