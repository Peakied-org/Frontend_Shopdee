
export default async function getPromotions() {

    const response = await fetch(`${process.env.BACKEND_URL}/promotion`,)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    return await response.json()
} 