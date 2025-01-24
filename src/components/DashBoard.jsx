import React from 'react'
import { Link } from 'react-router'

const DashBoard = () => {
  return (
    <div>
       <h1>Dashboard</h1>
    <div className='space-x-1 mt-1'>
  <Link className="bg-[#666CFF] rounded-md  text-white p-2" to={"/signin"}>Sign In</Link>
  <Link className="bg-[#666CFF] rounded-md  text-white p-2" to={"/signup"}>Sign Up</Link>
    </div>
    </div>
  )
}

export default DashBoard