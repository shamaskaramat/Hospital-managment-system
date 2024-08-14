import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('patient');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        age: '',
        gender: '',
        otp: ''
    });
    const handleTabChange = (role) => {
        setActiveTab(role);
        setIsRegistering(false);
        setIsForgotPassword(false);
        setIsResettingPassword(false);
        setFormData({
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            age: '',
            gender: '',
            otp: ''
        });
    };
    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        setIsForgotPassword(false);
        setIsResettingPassword(false);
    };
    const toggleForgotPassword = () => {
        setIsForgotPassword(!isForgotPassword);
        setIsRegistering(false);
        setIsResettingPassword(false);
    };
    const handleResetPassword = (event) => {
        event.preventDefault();
        console.log('Reset Password:', {
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.password,
            role: activeTab
        });
        setIsResettingPassword(true);
        setIsForgotPassword(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const role = activeTab;
        if (role === 'patient') {
            if (isRegistering) {
                console.log('Patient Registration:', {
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    age: formData.age,
                    gender: formData.gender,
                    email: formData.email,
                    password: formData.password,
                    role: role
                });
                setIsRegistering(false); // Switch to login view


            } else {
                console.log('Patient Login:', {
                    email: formData.email,
                    password: formData.password,
                    role: role
                });
            }
        } else if (role === 'doctor' || role === 'admin') {
            console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} Login:`, {
                email: formData.email,
                password: formData.password,
                role: role
            });
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-blue-400 to-blue-800 items-center justify-center">
            {/* Left Side: Image */}
            <div className="flex-1 hidden lg:flex items-center justify-center p-12">
                <img
                    src="https://media.istockphoto.com/id/1365379711/vi/vec-to/b%C3%A1c-s%C4%A9-vi%E1%BA%BFt-%C4%91%C6%A1n-thu%E1%BB%91c-rx-kh%C3%A1i-ni%E1%BB%87m-ch%C4%83m-s%C3%B3c-s%E1%BB%A9c-kh%E1%BB%8Fe-v%C3%A0-d%C6%B0%E1%BB%A3c-ph%E1%BA%A9m.jpg?s=612x612&w=0&k=20&c=0GbPbzmt8lYhWgsQt0Pt3gQzDY3DJry7UtYhmHtJqBc="
                    alt="Login"
                    className="w-full h-92 object-cover rounded-3xl shadow-2xl"
                />
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white border-opacity-30">
                    <div className="tabs flex space-x-4 mb-8">
                        {['patient', 'doctor', 'admin'].map((tab) => (
                            <button
                                key={tab}
                                className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ease-in-out rounded-full ${activeTab === tab
                                    ? 'bg-white text-blue-600 shadow-md'
                                    : 'text-white hover:bg-white hover:bg-opacity-30'
                                    }`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div id="login-forms" className="text-white">
                        {activeTab === 'patient' && !isForgotPassword && !isResettingPassword && (
                            <div className="login-form">
                                <h2 className="text-3xl font-bold mb-6">
                                    {isRegistering ? 'Patient Registration' : 'Patient Login'}
                                </h2>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {isRegistering && (
                                        <>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Full Name"
                                                className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                            />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                                className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                            />
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                placeholder="Age"
                                                className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                            />
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </>
                                    )}
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    {!isRegistering && (
                                        <p className="mt-4 text-start">
                                            <button type="button" onClick={toggleForgotPassword} className="font-semibold underline">
                                                Forgot Password?
                                            </button>
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-opacity-90 transition duration-300"
                                    >
                                        {isRegistering ? 'Register' : 'Login'}
                                    </button>
                                </form>
                                <p className="mt-6 text-center">
                                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                                    <button type="button" onClick={toggleRegister} className="font-semibold underline">
                                        {isRegistering ? 'Login here' : 'Register here'}
                                    </button>
                                </p>
                            </div>
                        )}

                        {isForgotPassword && !isResettingPassword && (
                            <div className="login-form">
                                <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
                                <form className="space-y-6" onSubmit={handleResetPassword}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-opacity-90 transition duration-300"
                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="mt-6 text-center">
                                    <button type="button" onClick={() => setIsForgotPassword(false)} className="font-semibold underline">
                                        Back to Login
                                    </button>
                                </p>
                            </div>
                        )}

                        {isResettingPassword && (
                            <div className="login-form">
                                <h2 className="text-3xl font-bold mb-6">Reset Password</h2>
                                <form className="space-y-6" onSubmit={handleResetPassword}>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleInputChange}
                                        placeholder="Enter OTP"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="New Password"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-opacity-90 transition duration-300"
                                    >
                                        Reset Password
                                    </button>
                                </form>
                                <p className="mt-6 text-center">
                                    <button type="button" onClick={() => setIsResettingPassword(false)} className="font-semibold underline">
                                        Back to Forgot Password
                                    </button>
                                </p>
                            </div>
                        )}

                        {(activeTab === 'doctor' || activeTab === 'admin') && !isForgotPassword && !isResettingPassword && (
                            <div className="login-form">
                                <h2 className="text-3xl font-bold mb-6">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login
                                </h2>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-opacity-90 transition duration-300"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
