import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import UploadBill from './pages/UploadBill';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { setAuthToken } from './api';

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>

      {/* Show navbar only if logged in */}
      {auth && <Navbar setAuth={setAuth} />}

      <Routes>
        {/* home = dashboard */}
        <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />

        {/* protected routes */}
        <Route path="/products" element={auth ? <Products /> : <Navigate to="/login" />} />
        <Route path="/upload" element={auth ? <UploadBill /> : <Navigate to="/login" />} />

        {/* public routes */}
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}
