export default async function userLogin(userName:string, userPassword:string) {
    const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            password: userPassword
        }),
    })
    if(!response.ok){
        throw new Error("Failed to log-in")
    }
    return await response.json()

}