import React from 'react'

import Navbar from './main/Navbar';
import Hero from './main/Hero';
import Advantages from './main/Advantages';
import Offers from './main/Offers';
import Footer from './main/Footer';



const Base = () => {
  return (
    <div className="w-screen h-screen basic bg-slate-100 overflow-x-hidden"> 
        <Navbar />
        <Hero />
        <Advantages />
        <Offers />
        <Footer />
    </div>
  )
}

export default Base;