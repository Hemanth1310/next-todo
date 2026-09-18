"use client"
import React, { useTransition } from 'react'
import { deleteTodoAction } from '../actions/todoActions'

type Props = {
    id:number
}

const DeleteTodoButton = ({id}: Props) => {
    const [isPending,startTransition] = useTransition()

    const handleDelete = ()=>{
        startTransition(async()=>{
            await deleteTodoAction(id)
        })
    }
  return (
    <button onClick={handleDelete} className='btn btn-xs btn-outline btn-error'>Delete</button>
  )
}

export default DeleteTodoButton