import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // Close menu on mobile after clicking
    }
  };

  return (
    <div className="fixed w-full bg-white shadow-xl z-50">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 h-[80px]">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/images/logoOnkoreIcon.png" alt="onkore" className="h-[36px] md:h-[42px]" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-lg md:text-2xl font-semibold items-center tracking-wide">
          <div className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150" 
               onClick={() => scrollToSection("offers")}>
            Kup kursy
          </div>
          <Link to="/logowanie" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150">
            Zaloguj
          </Link>
          <Link to="/rejestracja" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150">
            Zarejestruj
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl text-slate-900 focus:outline-none" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* Backdrop when menu is open */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>
      )}

      {/* Sliding Mobile Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 
                      ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-3xl text-gray-900" onClick={closeMenu}>
          <FaTimes />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center gap-6 pt-20 text-xl">
          <div className="cursor-pointer hover:text-neonblue transition-all duration-150" 
               onClick={() => scrollToSection("offers")}>
            Kup kursy
          </div>
          <Link to="/logowanie" className="cursor-pointer hover:text-neonblue transition-all duration-150" onClick={closeMenu}>
            Zaloguj
          </Link>
          <Link to="/rejestracja" className="cursor-pointer hover:text-neonblue transition-all duration-150" onClick={closeMenu}>
            Zarejestruj
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
