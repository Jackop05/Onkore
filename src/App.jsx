import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPath from './pages/NoPath';
import Base from './pages/Base';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen text-slate-900">
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />

          <Route path="*" element={<NoPath />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
