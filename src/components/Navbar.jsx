import React from 'react'
// import "./Navbar.css"
import { FaHome } from "react-icons/fa";
const Navbar = () => {
  return (
   
     
        <nav className='flex justify-between bg-slate-700 text-white'>
        <FaHome className='home mx-9 my-6 text-xl font-bold' />
          <ul className='flex gap-8 mx-9 p-5'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>About</li>
            <li className='cursor-pointer hover:font-bold'>Contact Us</li>
          </ul>
        </nav>
    
  )
}

export default Navbar
