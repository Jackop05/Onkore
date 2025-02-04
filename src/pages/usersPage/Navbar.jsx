import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:2020/api/user/logout-user', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div
      id="navbar"
      className="text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-3xl bg-white fixed z-50"
    >
      <div className="items-center">
        <img src="../images/logoOnkoreIcon.png" alt="onkore" className="h-[42px]" />
      </div>
      <div className="flex gap-16 text-2xl font-semibold items-center tracking-wide">
        <div
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
          onClick={() => scrollToSection('offers')}
        >
          Kup kursy
        </div>
        <div
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
          onClick={() => scrollToSection('about-us')}
        >
          O nas
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
};

export default Navbar;
