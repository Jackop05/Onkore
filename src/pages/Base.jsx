import React from 'react'

import Navbar from './main/Navbar';
import Hero from './main/Hero';
import AboutUs from './main/AboutUs';



const Base = () => {
  return (
    <div className="w-screen h-screen basic bg-slate-50 overflow-x-hidden">
        <Navbar />
        <Hero />
        <AboutUs />
    </div>
  )
}

export default Base