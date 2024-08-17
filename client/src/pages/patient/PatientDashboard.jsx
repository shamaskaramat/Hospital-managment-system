import React from 'react'
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import { MdDashboard, MdOutlineSettings } from 'react-icons/md'
import { FaMessage } from "react-icons/fa6"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const sidebarClasses = 'bg-white text-gray-800 h-screen w-64 p-4 space-y-4 shadow-xl transition-all duration-300'
const linkClasses = 'flex items-center py-3 px-4 rounded-lg transition-all duration-300 '

const Sidebar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('authToken')
        navigate('/')
        toast.success('Logged out successfully!')
    }

    const isActive = (path) => window.location.pathname === path

    const NavLink = ({ to, icon: Icon, children }) => (
        <Link
            to={to}
            className={`${linkClasses} ${isActive(to) ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-600 hover:bg-blue-100'}`}
        >
            <Icon className={`text-xl ${isActive(to) ? 'text-white' : 'text-blue-500'}`} />
            <span className="ml-3">{children}</span>
        </Link>
    )

    return (
        <aside className={sidebarClasses}>
            <div className="flex items-center justify-between p-4 border-b ">
                <h1 className="text-xl font-bold text-blue-600">Services Hospital</h1>
            </div>
            <nav className="p-4 space-y-2">
                <NavLink to="/patient" icon={FaUserMd}>Dashboard</NavLink>
                <NavLink to="/patient/create-appointments" icon={FaUserMd}>Appointment</NavLink>
                <NavLink to="/patient/appointments-history" icon={FaUserInjured}>History</NavLink>
                <NavLink to="/patient/messages" icon={FaMessage}>Feedback</NavLink>
            </nav>
            <div className="absolute bottom-0  p-4 border-t">
                <button className={`${linkClasses} text-gray-600 hover:bg-blue-100`}>
                    <MdOutlineSettings className="text-xl text-blue-500 inline" />
                    <span className="ml-3">Settings</span>
                </button>
                <button
                    className={`${linkClasses} text-gray-600 hover:bg-blue-100`}
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="text-xl text-blue-500 inline" />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </aside>
    )
}

const PatientDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-grow p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default PatientDashboard
