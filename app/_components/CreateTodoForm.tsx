"use client"
import React, { useActionState, useEffect } from 'react'
import { initialStateType } from '../types'
import { createTodo } from '../actions/todoActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const initialState : initialStateType={
    error:"",
    success:false
}
const CreateTodoForm = () => {
    const [state, formAction, isPending] = useActionState(createTodo, initialState)
    const router = useRouter()
        useEffect(()=>{
            if(state.success){
                  toast.success('Todo Created',{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                })
                router.push('/dashboard')
            }
        },[router,state])
  return (
    <form action={formAction} className="card-body">
        <label className="label">Task</label>
        <input name='task' type="text" className="input w-full bg-mist-50" placeholder="Email" />
        <label className="label">Description</label>
        <textarea name='description' className="input min-h-52 w-full p-3 bg-mist-50" placeholder="Password" />
        <button disabled={isPending} className="mt-5 btn btn-soft bg-foreground hover:bg-foreground-light">
           {isPending?"...Creating":"Create Todo"}
        </button>
        {state.error && <p className='text-red-700'>{state.error}</p>}
    </form>
  )
}

export default CreateTodoForm