export default async function getItem(id:number) {

    const response = await fetch(`http://localhost:8080/item/${id}`,)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    return await response.json()
} 