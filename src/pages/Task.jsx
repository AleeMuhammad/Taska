import React from 'react'
import { Link } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from '../components/Table'
import { useSelector } from 'react-redux';

const Task = () => {

  const {user}=useSelector((state)=>state.user);

  return (
    <>
      {
        user ?(
          <div>
            <ToastContainer className={"mt-28"}/>
        <div className="task flex justify-center sm:justify-end ">
            <Link to={"/taskcreation"} >
            <button className='text-white bg-[#546FFF] text-center font[Plus Jakarta Sans] font-semibold text-sm p-3 w-56 rounded-xl'>Create New</button>
            </Link>
        </div>
        <div className='mt-8'>
            <Table/>
        </div>
          </div>
          
        ): (
          <div className="flex flex-col items-center  h-screen">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-6">Please sign in to create a task</p>
          </div>
        </div>
        
        )
      }
    </>
  )
}

export default Task