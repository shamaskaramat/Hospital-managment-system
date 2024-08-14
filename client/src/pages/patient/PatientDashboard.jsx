import React from 'react'
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaUserPlus, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { MdOutlineSettings } from "react-icons/md";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const sidebarClasses = 'bg-blue-700 text-white w-64 p-6 space-y-6'
const linkClasses = 'flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200'


const Sidebar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        Cookies.remove('authToken');
        navigate('/login');
        toast.success('Logged out successfully!');
    };
    return (
        <aside className={sidebarClasses}>
            <h1 className="text-2xl font-bold mb-8">Services Hospital</h1>
            <nav>
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Link to="" className={linkClasses}>

                        <MdDashboard className="mr-2" />
                        Dashboard
                    </Link>
                </h4>
                <ul className="space-y-2">
                    <li>
                        <Link to="/patient/create-appointments" className={linkClasses}>
                            <FaUserMd />
                            <span>Appointment</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/patient/appointments-history" className={linkClasses}>
                            <FaUserInjured />
                            <span> History</span>
                        </Link>
                    </li>

                </ul>
            </nav>
            <div className="border-t border-white my-6 w-full"></div>
            <button className={`${linkClasses} mt-auto`}>
                <MdOutlineSettings />
                <span>settings</span>
            </button>
            <button className={`${linkClasses} mt-auto`} onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

        </aside>
    )
}



const PatientDashboard = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default PatientDashboard