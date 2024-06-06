export default async function addStore(token: string, name: string, detail: string, image: string, banner: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/store/me`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            detail: detail,
            image: image,
            banner: banner
        }),
    });

    if (!response.ok) {
        throw new Error("Cannot create store");
    }

    return await response.json();
}