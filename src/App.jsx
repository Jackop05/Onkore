import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPath from './pages/NoPath';
import Base from './pages/Base';
import UsersPage from './pages/UsersPage';
import UserCourse from './pages/UserCourse';
import BuyCourse from './pages/BuyCourse';

import Admin from './pages/Admin';
import TeachersCourse from './pages/admin/TeachersCourse';
import TeachersRegister from './pages/admin/TeachersRegister';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen text-slate-900 bg-gray-100">
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />

          <Route path="/user/:username" element={<UsersPage />} />
          <Route path="/user/user-course/:username/:courseId" element={<UserCourse />} />
          <Route path="/user/buy-course/:userId/:courseId" element={<BuyCourse />} />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/rejestracja" element={<TeachersRegister />} />
          <Route path="/admin/:adminname" element={<Admin />} />
          <Route path="/admin/user-course-admin-view/:adminname" element={<TeachersCourse />} />

          <Route path="*" element={<NoPath />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
