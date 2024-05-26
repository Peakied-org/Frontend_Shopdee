import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user:{
            _id: string,
            name: string,
            role: string,
            tel: string,
            address: string,
            cardNumber: string,
            token: string
        }
    }
}