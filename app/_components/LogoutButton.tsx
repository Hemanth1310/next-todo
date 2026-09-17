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
    <span onClick={handleLogout} className='cursor-pointer hover:text-red-800'>Logout</span>
  )
}

export default LogoutButton