// src/components/Forms/ForgotPassword.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { forgotPassword } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../redux/Actions/PatientAction';

const PatientForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');
    // const [role] = useState('patient')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.patientForgotpass);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setErrors('Please enter your email address.');
            return;
        }
        dispatch(forgotPassword(email, navigate));
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            {errors && <p className="text-red-500 mb-4">{errors}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
};

export default PatientForgotPassword;
