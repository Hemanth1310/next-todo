"use client"
import React, { useTransition } from 'react'
import { deleteTodoAction } from '../actions/todoActions'
import { useRouter } from 'next/navigation'

type Props = {
    id:number
}

const DeleteTodoButton = ({id}: Props) => {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const handleDelete = ()=>{
        startTransition(async()=>{
            await deleteTodoAction(id)
            router.refresh()
        })
    }
  return (
    <button disabled={isPending} onClick={handleDelete} className='btn btn-xs btn-outline btn-error'>{isPending?"Deleting...":"Delete"}</button>
  )
}

export default DeleteTodoButton