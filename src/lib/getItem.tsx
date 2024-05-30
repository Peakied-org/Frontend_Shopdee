export default async function getItem(id:number) {

    const response = await fetch(`${process.env.BACKEND_URL}/item/${id}`,)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    const data = await response.json();
    return data.body;
} 