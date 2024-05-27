
export default async function getPromotions() {

    const response = await fetch("http://localhost:8080/promotion",)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    return await response.json()
} 