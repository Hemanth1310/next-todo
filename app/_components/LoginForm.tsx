"use client"
import React, { useActionState, useEffect} from 'react'
import { useFormState } from 'react-dom'
import { loginAction } from '../actions/authActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type initialStateType={
    error: string|null,
    success:boolean
}

const initialState:initialStateType = {
    error:"",
    success: false
}

const LoginForm = () => {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)
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
        }
    },[router,state])
  return (
     <form action={formAction} className="card-body">
        <label className="label">Email</label>
        <input name='email' type="email" className="input bg-mist-50" placeholder="Email" />
        <label className="label">Password</label>
        <input name='password' type="password" className="input bg-mist-50" placeholder="Password" />
        <div><a className="link link-hover">Forgot password?</a></div>
        <button disabled={isPending} className="btn btn-soft bg-foreground hover:bg-foreground-light">
            {isPending? "...Logging In":"Login"}
        </button>
        {state.error && <p className='text-red-700'>{state.error}</p>}

    </form>
  )
}

export default LoginForm