import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 



const TeachersLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // Function handles admin login
  const onSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const adminData = { email, password };

    try {
      const response = await fetch("http://localhost:2020/api/admin/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(adminData),
      });

      const result = await response.json();
      if (!response.ok) {
        setEmail("");
        setPassword("");
        setError(result.error || "Something went wrong...");
        return;
      }

      alert(result.message);
      navigate("/admin/logged-admin");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };


  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 relative">

      {/* Home link */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-neonblue text-3xl p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all"
          title="Go to Home"
        >
          <FaHome />
        </button>
      </div>

      {/* Login card */}
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neonblue text-center mb-6">Zaloguj</h1>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="TwójEmail@email.pl"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neonblue"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-1">Hasło:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ustaw hasło..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neonblue"
              required
            />
          </div>

          {/* Wrong email or password error */}
          {error && <p className="text-red-500 text-lg font-bold mb-2">{error}</p>}

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105"
          >
            <div className='drop-shadow-md text-xl'>Zaloguj</div>
          </button>
        </form>

        {/* Google Login Button */}
        <button className="flex items-center justify-center px-4 py-3 w-full border border-gray-400 rounded-lg shadow-sm bg-white text-gray-700 font-medium mt-4 focus:ring-2 focus:ring-gray-300 transition-all duration-150 hover:scale-105">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          <span className="font-medium text-lg">Zaloguj z Google</span>
        </button>
      </div>
    </div>
  );
};

export default TeachersLogin;
