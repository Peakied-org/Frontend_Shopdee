import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user:{
            id: string,
            name: string,
            role: string,
            tel: string,
            address: string,
            cardNumber: string,
            token: string
        }
    }
}