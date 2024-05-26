export default async function getUserProfile(token:string) {
    const response = await fetch("localhost:8080/api/v1/customers/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Cannot get user profile")
    }

    return await response.json()
}