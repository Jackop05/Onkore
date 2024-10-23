import React from 'react'

import Navbar from './main/Navbar';
import Hero from './main/Hero';
import AboutUs from './main/AboutUs';
import Advantages from './main/Advantages';
import Offers from './main/Offers';



const Base = () => {
  return (
    <div className="w-screen h-screen basic bg-slate-100 overflow-x-hidden">
        <Navbar />
        <Hero />
        <AboutUs />
        <Advantages />
        <Offers />
    </div>
  )
}

export default Base