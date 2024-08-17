import React from 'react'
import { FaCalendarPlus, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const cardClasses = 'bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 flex flex-col items-center max-w-xs mx-auto w-full';
const headingClasses = 'text-lg font-semibold text-blue-700 mb-2';
const textClasses = 'text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200 group';
const iconClasses = 'text-4xl text-blue-500 mb-4';

const MainPatientContent = () => {
    return (
        <main className="flex-1 p-8 bg-gray-50 ">
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Welcome Patient</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className={cardClasses}>
                    <FaCalendarPlus className={iconClasses} />
                    <h3 className={headingClasses}>Appointment</h3>
                    <Link to="/patient/create-appointments" className={textClasses}>
                        Book Appointment
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <div className={cardClasses}>
                    <FaCalendarAlt className={iconClasses} />
                    <h3 className={headingClasses}>Appointment History</h3>
                    <Link to="/patient/appointments-history" className={textClasses}>
                        View History
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default MainPatientContent;
