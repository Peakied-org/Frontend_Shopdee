export default async function register(username:string, usertelephonenumber:string, useraddress:string, userpassword:string, usercard:string|null) {
    const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            tel: usertelephonenumber,
            address: useraddress,
            password: userpassword,
            cardNumber: usercard
        }),
    })
    if(!response.ok){
        throw new Error("Failed to Register")
    }
    return await response.json()

}