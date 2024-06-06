import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import getUserProfile from './lib/getUserProfile';

export {default} from 'next-auth/middleware'

interface Token {
    body: {
        token: string;
    };
    iat: number;
    exp: number;
    jti: string;
}

export async function middleware(request: NextRequest) {
    const urlPath = request.nextUrl.pathname;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    
    if(token){
        //console.log(token)
        const typedToken = token as unknown as Token;
        const user = await getUserProfile(typedToken.body.token)
        //console.log(user.body.role)
        if(urlPath === '/store'){
            if(user.body.role !== 'ADMIN'){
                return NextResponse.rewrite(new URL('/auth/unauthorized', request.url))
            }
        
        }
    } else {
        return NextResponse.rewrite(new URL('/auth/login', request.url))
    }
    
    return NextResponse.next();
    
}

export const config = {
    matcher: [
        '/cart', '/order', '/profile', '/store'
    ]
}