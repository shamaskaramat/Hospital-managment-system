import React, { useState } from 'react'
import { FaUserMd, FaSignOutAlt } from 'react-icons/fa'
import { MdDashboard, MdOutlineSettings } from "react-icons/md"
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isExpanded, setIsExpanded] = useState(true)

    const handleLogout = () => {
        Cookies.remove('doctorToken')
        navigate('/')
        toast.success('Logged out successfully!')
    }

    const isActive = (path) => location.pathname === path

    const NavLink = ({ to, icon: Icon, children }) => (
        <Link
            to={to}
            className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${isActive(to)
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-100'
                }`}
        >
            <Icon className={`text-xl ${isActive(to) ? 'text-white' : 'text-blue-500'}`} />
            {isExpanded && <span className="ml-3 transition-opacity duration-300">{children}</span>}
        </Link>
    )

    return (
        <aside className={`bg-white text-gray-800 h-screen ${isExpanded ? 'w-64' : 'w-20'
            } transition-all duration-300 shadow-xl`}>
            <div className="flex items-center justify-between p-4 border-b">
                {isExpanded && <h1 className="text-xl font-bold text-blue-600">Services Hospital</h1>}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors duration-200"
                >
                    {isExpanded ? '←' : '→'}
                </button>
            </div>
            <nav className="p-4 space-y-2">
                <NavLink to="/doctor" icon={MdDashboard}>Dashboard</NavLink>
                <NavLink to="/doctor/appointments" icon={FaUserMd}>Appointments</NavLink>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t">
                <button className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-blue-100">
                    <MdOutlineSettings className="text-xl text-blue-500 inline" />
                    {isExpanded && <span className="ml-3">Settings</span>}
                </button>
                <button
                    className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-blue-100"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="text-xl text-blue-500 inline" />
                    {isExpanded && <span className="ml-3">Logout</span>}
                </button>
            </div>
        </aside>
    )
}

const DoctorDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-grow p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default DoctorDashboard