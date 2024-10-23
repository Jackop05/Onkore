import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <div className='text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-3xl bg-white fixed z-50'>
        <div className='items-center'>
            <img src="./images/logoOnkoreIcon.png" alt="onkore" className='h-[42px]' />
        </div>
        <div className='flex gap-16 text-2xl font-semibold items-center tracking-wide'>
            <div className='cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150'>Kup kursy</div>
            <div className='cursor-pointer hover:drop-shadow-sm hover:text-neonblue  transition-all duration-150'>O nas</div>
            <Link to="/logowanie"><div className='cursor-pointer hover:drop-shadow-sm hover:text-neonblue  transition-all duration-150'>Zaloguj</div></Link>
            <Link to="/rejestracja"><div className='cursor-pointer hover:drop-shadow-sm hover:text-neonblue  transition-all duration-150'>Zarejestruj</div></Link>
        </div>
    </div>
  )
}

export default Navbar;