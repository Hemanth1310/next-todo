

import EditTodoForm from '@/app/_components/EditTodoForm'
import prisma from '@/app/_lib/prisma'
import { getSession } from '@/app/_lib/session'
import Link from 'next/link'
import { notFound } from 'next/navigation'


const EditTodo =async ({params}:{params: Promise<{ id: string }>}) => {
   const user =await getSession()

    if(!user){
       return <div>Please  <Link className='text-text-light-900' href='/login'>Login</Link> to continue</div>
    }
    const {id} = await params
    const numd = Number(id)
    const todo = await prisma.todo.findUnique({
      where:{id:numd},
      select:{
        task:true,
        description:true
      }
    })

    if(!todo){
      notFound()
    }

  return (
    <div className='w-full flex-1 flex flex-col items-center p-5 gap-5'>
      <h3 className='text-2xl'></h3>
      <div className="card bg-mist-200 w-full max-w-sm shrink-0 shadow-2xl">
                <EditTodoForm id={numd} initialData={todo}/>
            </div>
    </div>
  )
}

export default EditTodo