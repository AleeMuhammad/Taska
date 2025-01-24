import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, Routes, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Layout from './Layout'
import Task from './pages/Task'
import TaskCreation from './pages/TaskCreation'

function App() {

  const router=createBrowserRouter(
     createRoutesFromElements(
      <>
      <Route path='/' element={<Layout/>} >
       <Route path='/' element={<Task/>} />
       <Route path='taskcreation'element={<TaskCreation/>}/>
      </Route>
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      </>
     )
  )
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
