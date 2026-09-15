"use server"
import { redirect } from "next/navigation"
import prisma from "../_lib/prisma"
import { deleteSession, setSession } from "../_lib/session"
import { error } from "console"

type initialStateType={
    error: string|null,
    success?:boolean
}

export async function loginAction(prevState:initialStateType,formData:FormData){
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    let isSuccess = false
    if(!email|| !password){
        return {
            error:"Email or Password field is empty",
            success:false
        }
    }

    try{
        const user =await prisma.user.findUnique({
            where:{email:email}
        })

        if(!user){
            return {
                error:"User not found",
                success:false
            }
        }

        if(user.password!==password){
            return {
                error:"Password is incorrect",
                success:false
            }
        }

        await setSession(user)
        isSuccess=true
        return {
            error:null, success:true
        }
    }catch{
        return {
            error:'Unexpecter error occured',
            success:false
        }
    }

    // if(isSuccess){
    //     redirect('/dashboard')
    // }
    return { error: null, success:false}
}

export async function logoutAction(){     
        await deleteSession()
}   