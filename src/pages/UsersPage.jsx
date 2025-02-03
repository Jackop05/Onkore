import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from './main/Navbar';
import Hero from './main/Hero';
import Offers from './main/Offers';
import Footer from './main/Footer';
import Teachers from './usersPage/Teachers';
import AboutUs from './usersPage/AboutUs';
import MyCourses from './usersPage/MyCourses';




const UsersPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    console.log('Fetching user data')
    try {
      const response = await fetch('http://localhost:2020/api/user/get-user-data', {
          method: 'GET',
          credentials: 'include', // ✅ Allows cookies to be sent
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      console.log(data);
      
      navigate(`/user/${data.username}`);

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-screen h-screen basic bg-slate-100 overflow-x-hidden">
        <Navbar />
        <Hero />
        <Teachers />
        <MyCourses userData={userData} />
        <Offers />
        { 
            // <AboutUs />
        }
        <Footer />
    </div>
  )
}

export default UsersPage