// src/utils/auth.js

import Cookies from 'js-cookie';

// Check if the user is authenticated by looking for a JWT token in cookies
export const isAuthenticated = () => {
    const token = Cookies.get('token'); // Adjust the key if needed
    return !!token; // Returns true if a token exists, false otherwise
};

// Retrieve the user role from cookies or local storage
export const getUserRole = () => {
    const userRole = Cookies.get('role'); // Adjust the key if needed
    return userRole || null; // Returns the role or null if not found
};
