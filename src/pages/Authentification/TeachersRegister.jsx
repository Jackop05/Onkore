import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);


  // Handles admins registration
  const onSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const teacherData = { username, email, password, contact, description };

    try {
      const response = await fetch("http://localhost:2020/api/admin/register-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData)
      });

      const result = await response.json();
      if (!response.ok) {
        setUsername('');
        setEmail('');
        setPassword('');  
        setContact('');
        setDescription('');
        alert(result.error);
        throw new Error(result);
      }            
            
      alert(result.message);
      navigate("/logowanie");    
    } catch (error) {
      setError(error);
      console.error("Error:", error.message);
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

      {/* Registration card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neonblue text-center mb-6">Rejestracja nauczyciela</h1>

        {/* From */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" placeholder="Imię i nazwisko..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="email" placeholder="TwójEmail@email.pl" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="password" placeholder="Ustaw hasło..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="tel" placeholder="Twój numer telefonu..." value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <textarea placeholder="Krótki opis o sobie..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" rows="4" required />

          {/* Wrong data error */}
          {error && <p className="text-red-500 text-lg font-bold mb-4">{error}</p>}
          
          {/* Submit button */}
          <button type="submit" className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm hover:scale-105">Zarejestruj</button>
        </form>

        {/* Google Register */}
        <button className="flex items-center justify-center px-4 py-2 w-full border border-gray-400 rounded-md shadow-sm bg-white text-gray-700 font-medium focus:ring-2 focus:ring-gray-300 ease-in-out transition-all duration-150 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span className="font-medium text-lg">Zarejestruj z Google</span>
          </button>
      </div>
    </div>
  );
};

export default RegisterTeacher;
