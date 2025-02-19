import React from 'react'
import { Link } from 'react-router-dom';



const NoPath = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center basic bg-slate-50 text-[27px] md:text-[35px] text-center cursor-default px-20">
        <div className=''>Ścieżka, której szukasz nie istnieje.</div>
        <div className=''>Kliknij, aby wrócić do <span className='text-neonblue drop-shadow-sm'><Link to="/">głównej strony</Link></span>.</div>
    </div>
  )
}

export default NoPath;