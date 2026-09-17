"use server"

import { cookies } from "next/headers";
import { initialStateType } from "../types";
import { getSession } from "../_lib/session";
import prisma from "../_lib/prisma";
import { Prisma } from "../generated/prisma/client";



export async function createTodo(prev:initialStateType, formData:FormData):Promise<initialStateType>{
    const task = formData.get('task') as string
    const description  = formData.get('description') as string
    const user = await getSession()

    if(!user){
        return {
            error:"User not logged in",
            success:false
        }
    }
    if(!task || !description){
        return{
            error:"One or more fields not filleld",
            success:false
        }
    }

    try{
        await prisma.todo.create({
            data:{
                task,
                description,
                authorId:user.id
            }
        })

        return {
            error:"",
            success:true
        }

    }catch(error){
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
        return{
            error:"Unexpected Error Occured",
            success:false
        }
    }
}

