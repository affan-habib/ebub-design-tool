import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-50">
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-1 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <Outlet />
    </>
  );
};

export default AdminLayout;
