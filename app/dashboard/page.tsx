import React from 'react'
import { getSession } from '../_lib/session'
import Link from 'next/link'
import prisma from '../_lib/prisma'
import StatusCheckBox from '../_components/StatusCheckBox'
import DeleteTodoButton from '../_components/DeleteTodoButton'

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
    <div className='w-full flex-1 flex flex-col items-center p-5 gap-5'>
      <h3 className='text-2xl'>Dashboard</h3>
      <div className="card bg-mist-200 text-foreground min-w-full max-w-sm shrink-0 shadow-2xl">
        <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th className='text-foreground'>Task</th>
                    <th className='text-foreground'>Description</th>
                    <th className='text-foreground'>Edit</th>
                     <th className='text-foreground'>Delete</th>
                    <th className='text-foreground'>Status</th>
                </tr>
                </thead>
                <tbody>
                
                    {todos.map(todo=>(
                        <tr key={todo.id}>
                             <th><StatusCheckBox id={todo.id} status={todo.status}/></th>
                            <td>{todo.task}</td>
                                <td>{todo.description}</td>
                                <td><Link href={`/todo/edit/${todo.id}`} className="btn btn-xs btn-outline btn-primary">Edit</Link></td>
                                <td><DeleteTodoButton id={todo.id}/></td>
                                <td>{todo.status? <div className="badge badge-outline badge-success">Success</div>:<div className="badge badge-outline badge-warning">Pending</div>}</td>
                        </tr>
                    ))}
                   
                
                </tbody>
            </table>
     </div>
    </div>
  )
}

export default Dashboard