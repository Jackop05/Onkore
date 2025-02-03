import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="navbar"
      className="text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-b-xl bg-white fixed z-50"
    >
      <div className="items-center">
        <img src="../../images/logoOnkoreIcon.png" alt="onkore" className="h-[42px]" />
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
        <Link
          to="/logowanie"
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
        >
          Zaloguj
        </Link>
        <Link
          to="/rejestracja"
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
        >
          Zarejestruj
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
