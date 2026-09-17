import React from 'react'
import { getSession } from '../_lib/session'
import Link from 'next/link'
import prisma from '../_lib/prisma'

const Dashboard = async() => {
    const user =await getSession()

    if(!user){
       return <div>Please  <Link className='text-text-light-900' href='/login'>Login</Link> to continue</div>
    }

    const todos = await prisma.todo.findMany({
        where:{
            authorId:user.id
        }
    })

    if(!todos){
        return <div>No data found create new todo</div>
    }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard