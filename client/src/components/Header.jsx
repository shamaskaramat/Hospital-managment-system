import React from 'react';
import { FaBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { PiHospitalFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/Actions/ThemeAction';

const Header = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className={`${darkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white p-4 shadow-md`}>
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <PiHospitalFill className="h-8 w-8 text-white mr-2" />
                    <span className="text-xl font-bold">HMS</span>
                </Link>

                <h1 className="text-2xl font-bold hidden md:block">Hospital Management System</h1>

                <div className="flex items-center space-x-4">
                    <button
                        className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                        onClick={handleToggle}
                    >
                        {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                    </button>

                    <div className="relative">
                        <button className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                            <FaBell className="h-5 w-5" />
                        </button>
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>

                    <div className="flex items-center">
                        <FaUserCircle className="h-8 w-8 mr-2 text-blue-200" />
                        <span className="font-semibold hidden sm:inline">Username</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;