import Link from 'next/link'
import React from 'react'
import { getSession } from '../_lib/session'
import LogoutButton from './LogoutButton'

const Navbar = async() => {
    const user = await getSession()

  return (
   <div className="navbar bg-foreground shadow-sm">
  <div className="flex-1">
    <Link href='/' className="btn btn-ghost text-xl">daisyUI</Link>
  </div>
  <div className="flex-none text-mist-100">
    {!user? <ul className="menu menu-horizontal px-1">
        <li><Link href='/login'>Login</Link></li>
        <li><Link href='/register'>Register</Link></li>
    </ul>:<ul className="menu menu-horizontal px-1">
        <li>
           <LogoutButton/>
        </li>
    </ul>}
        
  </div>
</div>
  )
}

export default Navbar