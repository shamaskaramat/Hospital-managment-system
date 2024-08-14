// src/components/Forms/ResetPassword.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/Actions/PatientAction';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.patientresetpass);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otp || !newPassword) {
            setErrors('Please enter OTP and new password.');
            return;
        }
        dispatch(resetPassword(otp, newPassword, navigate));
    };

    return (
        <div className="flex min-h-screen items-center bg-gray-100">
            {/* Left side with image */}
            <div className="w-1/2  flex items-center justify-center p-12">
                <img
                    src="https://imgvisuals.com/cdn/shop/products/animated-patient-flow-illustration-943688.gif?v=1697071141" // Replace with your image URL
                    alt="Hospital"
                    className="max-w-full h-auto rounded-lg shadow-2xl"
                />
            </div>
            <div className="w-96 h-96 mt-12 mx-auto p-4 border border-gray-300 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                {errors && <p className="text-red-500 mb-4">{errors}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Enter OTP"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
