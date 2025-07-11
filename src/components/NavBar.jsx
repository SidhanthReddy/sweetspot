import React from 'react'
import sweetspotVideo from '../assets/SweetSpot_animation.mp4';

function NavBar() {
  return (
    <nav className="bg-white grid grid-cols-24 items-center h-[100px] pt-1 pb-2">
        <div className="col-start-1 ml-[5rem] col-span-4 text-4xl">
          <video src={sweetspotVideo} autoPlay loop muted/>
        </div>
        <button className="col-start-18 col-span-1 text-2xl text-[rgba(79,79,79,0.66)] hover:text-[rgba(224,99,99,0.85)] transition-colors duration-200">Cakes</button>
        <button className="col-start-20 col-span-1 text-2xl text-[rgba(79,79,79,0.66)] hover:text-[rgba(224,99,99,0.85)]  transition-colors duration-200">Customize</button>
        <button className="col-start-22 col-span-1 text-2xl text-[rgba(79,79,79,0.66)] hover:text-[rgba(224,99,99,0.85)]  transition-colors duration-200">Orders</button>
        <button className="col-start-24 col-span-1 text-2xl text-[rgba(79,79,79,0.66)] hover:text-[rgba(224,99,99,0.85)]  transition-colors duration-200">Login</button>
    </nav>
  )
}

export default NavBar
