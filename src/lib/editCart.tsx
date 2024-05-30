export default async function editCart(cartDetailId: number, token: string, quantity: number) {
    // Edit cart to update the quantity
    const editResponse = await fetch(`${process.env.BACKEND_URL}/cart/${cartDetailId}?quantity=${quantity}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (!editResponse.ok) {
        const errorText = await editResponse.text();
        console.error(`Update cart quantity failed: ${errorText}`);
        throw new Error("Cannot update cart quantity");
    }

    return await editResponse.json();
}
