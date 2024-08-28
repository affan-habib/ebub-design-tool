import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-blue-800 text-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">User Sidebar</h2>
          <button 
            onClick={handleLogout} 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <ul className="mt-4">
          <li><a href="/user" className="block px-4 py-2 hover:bg-blue-700">Dashboard</a></li>
          <li><a href="/user/profile" className="block px-4 py-2 hover:bg-blue-700">Profile</a></li>
        </ul>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
