"use client"
import React from 'react'
import { logoutAction } from '../actions/authActions'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = async()=>{
        await logoutAction()
        router.push('/')
    }

  return (
    <li onClick={handleLogout} className='p'>Logout</li>
  )
}

export default LogoutButton