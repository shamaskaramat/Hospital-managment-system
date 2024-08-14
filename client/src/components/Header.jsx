import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { PiHospitalFill } from "react-icons/pi";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className="bg-blue-900 text-white p-4 flex items-center">

            <div className="flex items-center">
                <PiHospitalFill className="h-10 w-8 mr-2" />
            </div>

            <div className="flex-1 flex justify-center">
                <span className="text-2xl font-bold">Hospital Management System</span>
            </div>
            <div className="flex items-center">
                <div className="relative mr-4">
                    <button className="focus:outline-none">
                        <FaBell className="h-6 w-6" />
                    </button>
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                </div>
                <div className="flex items-center">
                    <FaUserCircle className="h-8 w-8 mr-2" />
                    <span className="font-semibold">Username</span>
                </div>
            </div>
        </header>
    );
};

export default Header;