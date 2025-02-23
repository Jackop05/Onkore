import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Authentification/Login';
import Register from './pages/Authentification/Register';
import ResetPassword from './pages/Authentification/ResetPassword';
import NoPath from './pages/NoPath';
import Base from './pages/Base';
import UsersPage from './pages/UsersPage';
import UserCourse from './pages/usersPage/UserCourse';
import BuyCourse from './pages/usersPage/BuyCourse';

import Admin from './pages/Admin';
import TeachersCourse from './pages/admin/TeachersCourse';
import TeachersLogin from './pages/Authentification/TeachersLogin';
import TeachersRegister from './pages/Authentification/TeachersRegister';



function App() {
  return (
    <Router>
      <div className="w-screen h-screen text-slate-900 bg-gray-100">
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="/user/reset-password/:token" element={<ResetPassword />} />

          <Route path="/user/:username" element={<UsersPage />} />
          <Route path="/user/user-course/:username/:courseId" element={<UserCourse />} />
          <Route path="/user/buy-course/:username/:courseId" element={<BuyCourse />} />

          <Route path="/admin/logowanie" element={<TeachersLogin />} />
          <Route path="/admin/rejestracja" element={<TeachersRegister />} />
          <Route path="/admin/:adminname" element={<Admin />} />
          <Route path="/admin/user-course-admin-view/:adminname/:courseId" element={<TeachersCourse />} />

          <Route path="*" element={<NoPath />} />     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
