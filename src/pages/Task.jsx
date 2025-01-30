import React from 'react'
import { Link } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from '../components/Table'

const Task = () => {

  return (
    <>
      <div>
            <ToastContainer className={"mt-28"}/>
        <div className="task flex justify-center sm:justify-end ">
            <Link to={"/taskcreation"} >
            <button className='text-white bg-[#546FFF] text-center font[Plus Jakarta Sans] font-semibold text-sm p-3 sm:w-56 w-[24rem] rounded-xl'>Create New</button>
            </Link>
        </div>
        <div className='mt-8'>
            <Table/>
        </div>
          </div>
    </>
  )
}

export default Task