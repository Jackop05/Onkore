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
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 relative">
      {/* 🏠 Home Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-neonblue text-3xl p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all"
          title="Go to Home"
        >
          <FaHome />
        </button>
      </div>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neonblue text-center mb-6">Rejestracja nauczyciela</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input type="text" placeholder="Imię i nazwisko..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="email" placeholder="TwójEmail@email.pl" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="password" placeholder="Ustaw hasło..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <input type="tel" placeholder="Twój numer telefonu..." value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" required />
          <textarea placeholder="Krótki opis o sobie..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-neonblue" rows="4" required />
          
          <button type="submit" className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm hover:scale-105">Zarejestruj</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacher;
