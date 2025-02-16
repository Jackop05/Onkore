import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from './usersPage/Navbar';
import Hero from './usersPage/Hero';
import Offers from './usersPage/Offers';
import Footer from './usersPage/Footer';
import Teachers from './usersPage/Teachers';
import MyCourses from './usersPage/MyCourses';

const UsersPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    console.log('Fetching user data');
    try {
      const response = await fetch('http://localhost:2020/api/user/get-user-data', {
          method: 'GET',
          credentials: 'include', // ✅ Allows cookies to be sent
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        navigate("/login");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }

    try {
      const response = await fetch('http://localhost:2020/api/user/get-user-current-courses', {
          method: 'GET',
          credentials: 'include', // ✅ Allows cookies to be sent
          headers: {  'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const courses = await response.json();
      setUserData(prevData => ({
        ...prevData,
        currentCourses: courses 
      }));
      console.log(courses);
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
        <Offers userData={userData} />
        <Footer />
    </div>
  );
}

export default UsersPage;
