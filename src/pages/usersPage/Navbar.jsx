import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
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
      closeMenu(); // Close menu after clicking
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:2020/api/user/logout-user", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed w-full bg-white shadow-xl z-50">
      <div className="mx-auto px-6 flex justify-between items-center h-[80px]">
        {/* Logo */}
        <img
          src="../images/logoOnkoreIcon.png"
          alt="Onkore"
          className="h-[42px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg md:text-2xl font-semibold items-center tracking-wide">
        <div
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
          onClick={() => scrollToSection('offers')}
        >
          Nowe kursy
        </div>
        <div
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
          onClick={() => scrollToSection('myCourses')}
        >
          Moje kursy
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
        >
          Wyloguj
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl text-slate-900 focus:outline-none" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-3xl text-slate-900 focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Backdrop when menu is open */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>
      )}

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-3xl text-gray-900" onClick={closeMenu}>
          <FaTimes />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center gap-6 pt-20 text-xl">
          <div
            className="cursor-pointer hover:text-neonblue transition-all duration-150"
            onClick={() => scrollToSection("offers")}
          >
            Nowe kursy
          </div>
          <button
            onClick={() => scrollToSection("myCourses")}
            className="cursor-pointer hover:text-neonblue transition-all duration-150"
          >
            Moje kursy
          </button>
          <button
            onClick={handleLogout}
            className="text-xl font-semibold text-red-600 hover:text-red-800 transition-all duration-150"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
