"use server"
import { redirect } from "next/navigation"
import prisma from "../_lib/prisma"
import { deleteSession, setSession } from "../_lib/session"
import { error } from "console"
import { Prisma } from "../generated/prisma/client"
import { initialStateType } from "../types"


export async function loginAction(prevState:initialStateType,formData:FormData):Promise<initialStateType>{
    const email = formData.get('email') as string
    const password = formData.get('password') as string
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


export async function registerAction(prevState:initialStateType, formData:FormData):Promise<initialStateType> {
    const email= formData.get('email') as string
    const password= formData.get('password') as string
    const name= formData.get('name') as string

    if(!email || !password || !name){
        return {
            error:"One or more fields are empty",
            success:false
        }
    }

    try{
        await prisma.user.create({
            data:{
                email,
                name,
                password
            }
        })

        return{
            success:true,
            error:""
        }

    }catch{
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2002 is the error code for "Unique constraint failed"
            if (error.code === 'P2002') {
            const target = error.meta?.target // Array of fields that failed unique check
            return { 
                success: false, 
                error: 'A user with this email already exists.' 
            }
            }
        }
         return { 
                success: false, 
                error: 'Unexpected error occured' 
            }
    }
}