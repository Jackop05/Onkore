import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 



const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // Handle login function
  const onSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:2020/api/user/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (!response.ok) {
        setEmail("");
        setPassword("");
        setError(result.error || "Something went wrong...");
        return;
      }

      alert(result.message);
      navigate("/user/logged-user");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50 px-4 relative">
      
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
      <div className="w-full max-w-[90%] sm:max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col justify-between px-6 sm:px-8 pt-6 pb-10 cursor-default">
        
        {/* Title */}
        <div className="titles text-[40px] sm:text-[50px] text-center mb-6 font-bold text-neonblue drop-shadow-lg">
          {"Zaloguj".split("").map((letter, i) => (
            <span key={i} className="hover:text-neongreen transition-all duration-100">
              {letter}
            </span>
          ))}
        </div>

        {/* Form */}
        <form className="w-full" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="TwójEmail@email.pl"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
              Hasło:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ustaw hasło..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue"
              required
            />
          </div>

          {/* Wrong email or password error */}
          {error && <p className="text-red-500 text-lg font-bold mb-4">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="w-full text-white py-2 mt-4 mb-4 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105">
            <div className="drop-shadow-md text-xl">Zaloguj</div>
          </button>
        </form>

        {/* Google Login */}
        <button className="flex items-center justify-center px-4 py-2 w-full border border-gray-400 rounded-md shadow-sm bg-white text-gray-700 font-medium focus:ring-2 focus:ring-gray-300 ease-in-out transition-all duration-150 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          </svg>
          <span className="font-medium text-lg">Zaloguj z Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
