import { User } from "@/app/generated/prisma/client";
import { cookies } from "next/headers";
import { UserFormatted } from "../types";


export async function setSession(user:User) {
    const {password,...rest} = user
    const cookie = await cookies()

    cookie.set('session',JSON.stringify(rest),{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        maxAge:60*60*24*7,
        path:'/'
    })
}

export async function getSession():Promise<UserFormatted|null>{
    const user  = (await cookies()).get('session')?.value
    if(!user){
        return null
    }
    return JSON.parse(user)
}

export async function deleteSession() {
     const cookie = await cookies()

     cookie.delete('session')
}