
export default async function getCoupon() {

    const response = await fetch("http://localhost:8080/coupon",)
    if(!response.ok){
        throw new Error("Failed to fetch promotion")
    }
    return await response.json()
} 