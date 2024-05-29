export default async function manageCart(id: number, token: string, type: string, quantity: number) {
    // Add item to cart
    const addResponse = await fetch(`http://localhost:8080/cart/${id}?type=${type}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (!addResponse.ok) {
        throw new Error("Cannot add to cart");
    }

    const addResponseBody = await addResponse.json();
    const reqId = addResponseBody.body.cartDetails;

    const newId = reqId.find((cartDetail: { itemID: number; }) => cartDetail.itemID === id)
    
    // Edit cart to update the quantity
    const editResponse = await fetch(`http://localhost:8080/cart/${newId.id}?quantity=${quantity}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (!editResponse.ok) {
        throw new Error("Cannot update cart quantity");
    }

    return await editResponse.json();
}
