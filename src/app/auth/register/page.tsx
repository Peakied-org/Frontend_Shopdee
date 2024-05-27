'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "@/lib/userRegister";

export default async function Register() {
    const [isSeller, setIsSeller] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const router = useRouter();


    const handleRegister = async (event: any) => {
        event.preventDefault();
        try {
            await register(username, telephone, address, password, isSeller ? cardNumber : null);
            router.push('/');
        } catch (error) {
            alert('error!')
            console.error("Failed to register:", error);
        }
    };

    return (
        <main>
            <div className={"fixed top-0 left-0 right-0 bg-white h-24 z-30 flex flex-row items-center justify-between"}>
                <Link href={'/'}>
                    <img className="w-fit h-[80%] object-cover ml-16" src="/img/logoReverse.png" alt="logo"/>
                </Link>
                <p className="font-mono text-emerald-500 mr-16 text-3xl font-bold uppercase">register</p>
            </div>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-custom-green flex">
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <img src="/img/weblogo.png" alt="Descriptive text" className="w-[30vw] h-fit"/>
                    <p className="text-2xl font-inter font-bold tracking-wide line-clamp-2 text-white">ช้อปได้ทุกที่ ช้อปดีเท่านั้น</p>
                </div>
                <div className="w-1/2 flex items-center justify-center mt-24">
                    <div className="bg-white p-4 w-[75%] h-fit rounded-lg">
                        <p className="font-mono text-emerald-500 ml-4 text-3xl font-bold uppercase">register</p>
                        <div className="flex justify-center my-4">
                            <button onClick={() => setIsSeller(false)} className={`px-4 py-2 mr-4 ${!isSeller ? 'bg-emerald-500 text-white w-[42%] text-xl' : 'bg-gray-200 text-gray-400 w-[42%] text-xl'}`}>Buyer</button>
                            <button onClick={() => setIsSeller(true)} className={`px-4 py-2 ml-4 ${isSeller ? 'bg-emerald-500 text-white w-[42%] text-xl' : 'bg-gray-200 text-gray-400 w-[42%] text-xl'}`}>Seller</button>
                        </div>
                        <form className="flex flex-col space-y-4 mt-8 items-center" onSubmit={handleRegister}>
                            <input className="border-2 border-gray-300 p-2 w-[90%]" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input className="border-2 border-gray-300 p-2 w-[90%]" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input className="border-2 border-gray-300 p-2 w-[90%]" type="tel" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                            {isSeller && <input className="border-2 border-gray-300 p-2 w-[90%]" type="text" placeholder="ID Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />}
                            <textarea className="border-2 border-gray-300 p-2 w-[90%]" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                            <button className="bg-custom-green text-white p-2 text-xl uppercase w-[30%]" type="submit">register</button>
                        </form>
                        <p className="mt-4 text-center text-zinc-400 text-lg">
                            Have an account? <a href="/auth/login" className="text-emerald-500 hover:underline font-semibold">Log In</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
