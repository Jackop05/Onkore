import React from 'react'

import Navbar from './usersPage/Navbar';
import Hero from './usersPage/Hero';
import Teachers from './usersPage/Teachers';
import Offers from './usersPage/Offers';
import AboutUs from './usersPage/AboutUs';
import Footer from './usersPage/Footer';
// import MyCourses from './usersPage/MyCourses';




const UsersPage = () => {
  return (
    <div className="w-screen h-screen basic bg-slate-100 overflow-x-hidden">
        <Navbar />
        <Hero />
        <Teachers />
        { 
          // <MyCourses /> 
        }
        <Offers />
        <AboutUs />
        <Footer />
    </div>
  )
}

export default UsersPage