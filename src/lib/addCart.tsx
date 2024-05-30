export default async function addCart(id: number, token: string, type: string) {
    // Add item to cart
    const addResponse = await fetch(`${process.env.BACKEND_URL}/cart/${id}?type=${type}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (!addResponse.ok) {
        const errorText = await addResponse.text();
        console.error(`Add to cart failed: ${errorText}`);
        throw new Error("Cannot add to cart");
    }

    const addResponseBody = await addResponse.json();
    return addResponseBody.body.cartDetails;
}
