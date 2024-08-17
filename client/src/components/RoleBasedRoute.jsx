import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoute = ({ requiredRole }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Replace with your authentication context or state

    if (!user || user.role !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
