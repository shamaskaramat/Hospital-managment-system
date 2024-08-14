
import React from 'react'
import { FaCalendarPlus, FaUserInjured, FaCalendarAlt, FaUserPlus, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const cardClasses = 'bg-white p-6  rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-200'
const headingClasses = 'text-xl font-semibold text-blue-700 mb-2'
const textClasses = 'text-blue-600 hover:text-blue-800 font-medium'
const MainPatientContent = () => {
    return (
        <main className="flex-1 p-8 bg-gray-100">
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Welcome Patient</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className={cardClasses}>
                    <FaCalendarPlus className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Appointment</h3>
                    <Link to="/patient/create-appointments" className={textClasses}>
                        book appointment
                    </Link>
                </div>
                <div className={cardClasses}>
                    <FaCalendarAlt className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Appointment History</h3>
                    <Link to="/patient/appointments-history" className={textClasses}>
                        Appointments History
                    </Link>
                </div>
            </div>
        </main>
    )
}
export default MainPatientContent