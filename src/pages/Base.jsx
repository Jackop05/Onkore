import React from 'react'

import Navbar from './main/Navbar';
import Hero from './main/Hero';
import AboutUs from './main/AboutUs';
import Advantages from './main/Advantages';



const Base = () => {
  return (
    <div className="w-screen h-screen basic bg-slate-50 overflow-x-hidden">
        <Navbar />
        <Hero />
        <AboutUs />
        <Advantages />
    </div>
  )
}

export default Base