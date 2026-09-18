"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { initialStateType, TodoPayload } from '../types'
import { createTodo,  editTodoAction} from '../actions/todoActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const initialState : initialStateType={
    error:"",
    success:false
}
const EditTodoForm = ({id,initialData}:{id:number,initialData:TodoPayload}) => {
    const [state, formAction, isPending] = useActionState(editTodoAction,initialState)
    const router = useRouter()
    useEffect(()=>{
        if(state.success){
              toast.success('Login Successful',{
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
            router.refresh()
        }
    },[state,router])
  return (
    <form action={formAction} className="card-body">
        <input type="hidden" name="id" value={id} />
        <label className="label">Task</label>
        <input name='task' type="text" className="input w-full bg-mist-50" placeholder="Task" defaultValue={initialData.task}/>
        <label className="label">Description</label>
        <textarea name='description' className="input min-h-52 w-full p-3 bg-mist-50" placeholder="Description" defaultValue={initialData.description||""}/>
        <button disabled={isPending} className="mt-5 btn btn-soft bg-foreground hover:bg-foreground-light">
           {isPending?"...Editing":"Edit Todo"}
        </button>
        {state.error && <p className='text-red-700'>{state.error}</p>}
    </form>
  )
}

export default EditTodoForm