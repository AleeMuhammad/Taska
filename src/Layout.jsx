import React from 'react'
import { Outlet } from 'react-router'
import Header from './components/Header'
import SideMenu from './components/SideMenu'

const Layout = () => {
  return (
    <div>
        <div className="flex h-screen">
  <SideMenu className="w-1/3 bg-gray-100" />
  <div className="flex-1 flex flex-col">
    <Header />
    <main className="flex-1 bg-[#fafafa] p-4">
      <Outlet />
    </main>
  </div>
</div>

    </div>
  )
}

export default Layout