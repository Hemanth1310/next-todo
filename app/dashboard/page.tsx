import React from 'react'
import { getSession } from '../_lib/session'
import { redirect } from 'next/navigation'

const Dashboard = async() => {
    const user =await getSession()

    if(!user){
        redirect('/')
    }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard