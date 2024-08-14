import React from 'react'
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaUserPlus, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineSettings } from "react-icons/md";

const sidebarClasses = 'bg-blue-700 text-white w-64 p-6 space-y-6'
const linkClasses = 'flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200'


const Sidebar = () => {
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
                        <Link to="/appointments" className={linkClasses}>
                            <FaUserMd />
                            <span>Appointments</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="border-t border-white my-6 w-full"></div>
            <button className={`${linkClasses} mt-auto`}>
                <MdOutlineSettings />
                <span>settings</span>
            </button>
            <button className={`${linkClasses} mt-auto`}>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

        </aside>
    )
}



const DoctorDashboard = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default DoctorDashboard