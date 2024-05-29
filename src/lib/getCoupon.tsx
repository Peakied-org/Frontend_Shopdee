export default async function getCoupon() {
    const response = await fetch("http://localhost:8080/coupon");
    if (!response.ok) {
        throw new Error("Failed to fetch Coupon");
    }
    const data = await response.json();
    return data.body;
}