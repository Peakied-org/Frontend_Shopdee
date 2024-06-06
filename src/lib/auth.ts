import { AuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import userLogin from "@/lib/userLogIn";

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              name: { label: "Name", type: "text", placeholder: "Username" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              
            if(!credentials) return null
            const user = await userLogin(credentials.name, credentials.password)
        
              if (user) {
                return user
              } else {
                return null
              }
            }
          })

    ],
    session: {strategy:"jwt"},
    callbacks: {
        async jwt({token,user}){
            return{...token,...user}
        },
        async session({session,token,user}){
            session.user = token as any
            return session
        }
    },
    pages:{
      signIn:"/auth/login",
      error: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET
}
