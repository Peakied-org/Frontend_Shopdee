export default async function editProfile(token: string, tel: string|null, address: string|null, card_number: string|null) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/customers/me`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tel: tel,
            address: address,
            card_number: card_number
        }),
    })
    if(!response.ok){
        throw new Error("Failed to log-in")
    }
    return await response.json()

}