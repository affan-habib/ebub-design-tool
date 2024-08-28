import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layout/AdminLayout';
import CreateEbook from '../pages/CreateBook';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<CreateEbook />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
      <Route path="/both" element={<h2>Both Admin and User Page</h2>} />
    </Route>
    <Route path="/" element={<Navigate to="/public" />} />
  </Routes>
);

export default AppRoutes;
