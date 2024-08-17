import React, { useState } from 'react';
import PatientLogin from '../components/Forms/PatientLogin';
import PatientForgotPassword from '../components/Forms/PatientForgotPassword';
import PatientRegister from '../components/Forms/PatientRegister';
import DoctorLogin from '../components/Forms/DoctorLogin';
import AdminLogin from '../components/Forms/AdminLogin';
import ResetPassword from '../components/Forms/PatientResetPassword';

const Home = () => {
    const [selectedTab, setSelectedTab] = useState('patient');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);

    const tabs = [
        { key: 'patient', label: 'Patient' },
        { key: 'doctor', label: 'Doctor' },
        { key: 'admin', label: 'Admin' },
    ];

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setIsForgotPassword(false);
        setIsRegistering(false);
        setIsResetPassword(false);
    };

    const handleRegistrationSuccess = () => {
        setIsRegistering(false);
        setIsForgotPassword(false);
        setIsResetPassword(false);
    };

    const handleForgotPasswordClick = () => {
        setIsForgotPassword(true);
        setIsRegistering(false);
        setIsResetPassword(false);
    };

    const handleSendResetLink = () => {
        setIsForgotPassword(false);
        setIsResetPassword(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left side with image */}
            <div className="w-1/2  flex items-center justify-center p-12">
                <img
                    src="https://imgvisuals.com/cdn/shop/products/animated-patient-flow-illustration-943688.gif?v=1697071141" // Replace with your image URL
                    alt="Hospital"
                    className="max-w-full h-auto rounded-lg shadow-2xl"
                />
            </div>

            {/* Right side with tabs and form */}
            <div className="w-1/2 flex flex-col justify-center p-5 items-center">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome Back</h1>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 bg-white rounded-full p-1 shadow-md">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${selectedTab === tab.key
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            onClick={() => handleTabChange(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Login Forms */}
                <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
                    {selectedTab === 'patient' && !isForgotPassword && !isRegistering && !isResetPassword && (
                        <>
                            <PatientLogin />
                            <div className="flex justify-center items-center mt-6 bg-white border border-gray-300 rounded-full shadow-md">
                                <button
                                    onClick={handleForgotPasswordClick}
                                    className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${isForgotPassword ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Forgot password?
                                </button>
                                <span className="text-gray-600 mx-2">|</span> {/* Vertical separator with margin */}
                                <button
                                    onClick={() => setIsRegistering(true)}
                                    className={`flex-1 py-2 px-4 rounded-full transition-all duration-200 ${isRegistering ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Register Here
                                </button>
                            </div>
                        </>
                    )}
                    {selectedTab === 'patient' && isForgotPassword && !isResetPassword && (
                        <>
                            <PatientForgotPassword onSendResetLink={handleSendResetLink} />
                            <div className="text-sm text-center mt-4">
                                <button
                                    onClick={() => setIsForgotPassword(false)}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Back to login
                                </button>
                            </div>
                        </>
                    )}
                    {selectedTab === 'patient' && isRegistering && (
                        <>
                            <PatientRegister onSuccess={handleRegistrationSuccess} />
                            <div className="text-sm text-center mt-4">
                                <button
                                    onClick={() => setIsRegistering(false)}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Back to login
                                </button>
                            </div>
                        </>
                    )}
                    {selectedTab === 'patient' && isResetPassword && (
                        <>
                            <ResetPassword />
                            <div className="text-sm text-center mt-4">
                                <button
                                    onClick={() => setIsResetPassword(false)}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Back to login
                                </button>
                            </div>
                        </>
                    )}
                    {selectedTab === 'doctor' && <DoctorLogin />}
                    {selectedTab === 'admin' && <AdminLogin />}
                </div>
            </div>
        </div>
    );
};

export default Home;
