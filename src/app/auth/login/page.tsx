'use client'
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [pass, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (event:any) => {
        event.preventDefault();
        try {
            await signIn("credentials",{
                name:username,
                password:pass,
                redirect: true,
                callbackUrl: "/",
        })
            router.push('/');
        } catch (error) {
            alert('error!')
            console.error("Failed to login:", error);
        }
    };

    return (
        <main>
            <div className={"fixed top-0 left-0 right-0 bg-white h-24 z-30 flex flex-row items-center justify-between"}>
                <Link href={'/'}>
                    <img className="w-fit h-[80%] object-cover ml-16" src="/img/logoReverse.png" alt="logo"/>
                </Link>
                <p className="font-mono text-emerald-500 mr-16 text-3xl font-bold uppercase">login</p>
            </div>
            <div className="py-16 bg-custom-green flex w-[100vw] h-[90vh]">
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <img src="/img/weblogo.png" alt="Descriptive text" className="w-[30vw] h-fit"/>
                    <p className="text-2xl font-inter font-bold tracking-wide line-clamp-2 text-white">ช้อปได้ทุกที่ ช้อปดีเท่านั้น</p>
                </div>
                <div className="w-1/2 flex items-center justify-center mt-24">
                    <div className="bg-white p-4 w-[75%] h-fit rounded-lg">
                        <p className="font-mono text-emerald-500 ml-4 text-3xl font-bold uppercase">login</p>
                        <form className="flex flex-col space-y-4 mt-8 items-center" onSubmit={handleLogin}>
                            <input className="border-2 border-gray-300 p-2 w-[90%]" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input className="border-2 border-gray-300 p-2 w-[90%]" type="password" placeholder="Password" value={pass} onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-custom-green text-white p-2 text-xl uppercase w-[30%]" type="submit">login</button>
                        </form>
                        <p className="mt-4 text-center text-zinc-400 text-lg">
                            Don't have an account? <a href="/auth/register" className="text-emerald-500 hover:underline font-semibold">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
