import React from 'react'

function NavBar() {
  return (
    <nav className="bg-white grid grid-cols-12 items-center h-[100px] pt-1 pb-2">
        <div className="col-start-1 ml-[5rem] col-span-2 text-4xl">
            <p>Sweet Spot</p>
        </div>
        <button className="col-start-9 col-span-1 text-[20px]  text-[rgba(79,79,79,0.66)] hover:text-black transition-colors duration-200">Cakes</button>
        <button className="col-start-10 col-span-1 text-[20px] text-[rgba(79,79,79,0.66)] hover:text-black transition-colors duration-200">Customize</button>
        <button className="col-start-11 col-span-1 text-[20px] text-[rgba(79,79,79,0.66)] hover:text-black transition-colors duration-200">Orders</button>
        <button className="col-start-12 col-span-1 text-[20px]  text-[rgba(79,79,79,0.66)] hover:text-black transition-colors duration-200">Login</button>
    </nav>
  )
}

export default NavBar
