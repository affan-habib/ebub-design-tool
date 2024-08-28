import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../store/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (role) => {
    dispatch(login({ role }));
    const redirectUrl = location.state?.from || '/';
    navigate(redirectUrl);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        <button 
          onClick={() => handleLogin('admin')} 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Login as Admin
        </button>
        <button 
          onClick={() => handleLogin('user')} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Login as User
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
