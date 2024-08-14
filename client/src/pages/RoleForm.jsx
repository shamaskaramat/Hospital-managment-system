// src/components/RoleForm.js
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const RoleForm = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('patient');

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        if (role !== 'patient') {
            navigate(`/${role}/login`);
        } else {
            navigate(`/patient/login`);
        }

    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-400 to-blue-800 items-center justify-evenly">
            <div className="     p-12">
                <img
                    src="https://media.istockphoto.com/id/1365379711/vi/vec-to/b%C3%A1c-s%C4%A9-vi%E1%BA%BFt-%C4%91%C6%A1n-thu%E1%BB%91c-rx-kh%C3%A1i-ni%E1%BB%87m-ch%C4%83m-s%C3%B3c-s%E1%BB%A9c-kh%E1%BB%8Fe-v%C3%A0-d%C6%B0%E1%BB%A3c-ph%E1%BA%A9m.jpg?s=612x612&w=0&k=20&c=0GbPbzmt8lYhWgsQt0Pt3gQzDY3DJry7UtYhmHtJqBc="
                    alt="Login"
                    className="w-full h-92 object-cover rounded-3xl shadow-2xl"
                />
            </div>
            <div className="max-w-md mx-auto p-4">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => handleRoleChange('patient')}
                        className={`p-2 rounded ${selectedRole === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Patient
                    </button>
                    <button
                        onClick={() => handleRoleChange('doctor')}
                        className={`p-2 rounded ${selectedRole === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Doctor
                    </button>
                    <button
                        onClick={() => handleRoleChange('admin')}
                        className={`p-2 rounded ${selectedRole === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Admin
                    </button>
                </div>

                {/* Render the correct component based on the URL */}
                <Outlet />
            </div>
        </div>
    );
};

export default RoleForm;
