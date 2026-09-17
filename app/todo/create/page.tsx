
import CreateTodoForm from '@/app/_components/CreateTodoForm'
import { getSession } from '@/app/_lib/session'
import Link from 'next/link'


const CreateTodo =async () => {
   const user =await getSession()

    if(!user){
       return <div>Please  <Link className='text-text-light-900' href='/login'>Login</Link> to continue</div>
    }
  return (
    <div className='w-full flex-1 flex flex-col items-center p-5 gap-5'>
      <h3 className='text-2xl'>Create a Todo</h3>
      <div className="card bg-mist-200 w-full max-w-sm shrink-0 shadow-2xl">
                <CreateTodoForm/>
            </div>
    </div>
  )
}

export default CreateTodo