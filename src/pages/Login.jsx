import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:2020/api/user/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // Important for cookies
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log(result);

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
    <div className="w-screen h-screen flex flex-col justify-center basic bg-slate-50">
        <div className="w-[400px] h-[600px] mx-auto rounded-[20px] shadow-xl flex flex-col justify-between px-8 pt-6 pb-16 bg-white cursor-default">
            <div className='titles text-[50px] text-center mb-8 font-bold text-neonblue drop-shadow-lg'>
                <span className="hover:text-neongreen transition-all duration-100">Z</span>
                <span className="hover:text-neongreen transition-all duration-100">a</span>
                <span className="hover:text-neongreen transition-all duration-100">l</span>
                <span className="hover:text-neongreen transition-all duration-100">o</span>
                <span className="hover:text-neongreen transition-all duration-100">g</span>
                <span className="hover:text-neongreen transition-all duration-100">u</span>
                <span className="hover:text-neongreen transition-all duration-100">j</span>
            </div>
            <form className='' onSubmit={(event) => onSubmit(event)}>
              <div class="mb-4">
                  <label for="email" class="block text-gray-800 font-semibold mb-2">Email:</label>
                  <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="TwójEmail@email.pl" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue" required />
              </div>
              <div class="mb-4">
                  <label for="password" class="block text-gray-800 font-semibold mb-2">Hasło:</label>
                  <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ustaw hasło..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-neonblue" required />
              </div>

              <p id="error" class={`text-red-500 text-lg font-bold mb-4 ${error ? '' : 'hidden'}`}>Passwords do not match!</p>

              <button type="submit" class="w-full text-white py-2 mt-4 mb-4 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105">
                  <div className='drop-shadow-md text-xl'>Zaloguj</div>
              </button>
          </form>

          <button className="flex items-center justify-between px-4 py-2 w-full border border-gray-400 rounded-md shadow-sm bg-white text-gray-700 font-medium focus:ring-2 focus:ring-gray-300 ease-in-out transition-all duration-150 hover:scale-105">
                <div className="flex items-center w-full justify-center">
                  <div className="w-5 h-5 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-lg">Zaloguj z Google</span>
                </div>
              </button>
        </div>
    </div>
  )
}

export default Login;