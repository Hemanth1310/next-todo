"use client"

import { useActionState, useEffect } from "react"
import { registerAction } from "../actions/authActions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type initialStateType={
    error: string|null,
    success:boolean
}

const initialState:initialStateType = {
    error:"",
    success: false
}

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerAction,initialState)
    const router = useRouter()
     useEffect(()=>{
            if(state.success){
                  toast.success('Registeration Successful',{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                })
                router.push('/login')
            }
        },[router,state])
  return (
     <form action={formAction} className="card-body">
        <label className="label">Email</label>
        <input name='email' type="email" className="input bg-mist-50" placeholder="Email" />
        <label className="label">Password</label>
        <input name='password' type="password" className="input bg-mist-50" placeholder="Password" />
        <label className="label">Name</label>
        <input name='name' type="text" className="input bg-mist-50" placeholder="Name" />
        
        <div><a className="link link-hover">Forgot password?</a></div>

        <button disabled={isPending} className="btn btn-soft bg-foreground hover:bg-foreground-light">
            {isPending? "...Registering":"Register"}
        </button>
        {state.error && <p className='text-red-700'>{state.error}</p>}

    </form>
  )
}

export default RegisterForm