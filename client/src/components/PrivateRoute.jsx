import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Dummy function to get user role (you can replace it with real implementation)
const getUserRole = () => {
    // Replace this with actual role fetching logic
    return 'admin'; // or 'patient', 'doctor'
};

const ProtectedRoute = ({ allowedRoles }) => {
    const role = getUserRole();

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;