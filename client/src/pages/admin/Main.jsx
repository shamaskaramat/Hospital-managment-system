import React from 'react';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const cardClasses = 'bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-200';
const headingClasses = 'text-xl font-semibold text-blue-700 mb-2';
const textClasses = 'text-blue-600 hover:text-blue-800 font-medium';

const MainContent = () => {
    return (
        <main
            className="flex-1 p-8 bg-gray-100"
        // style={{
        //     backgroundImage: 'url(../../../../assets/bd-doc.jpg)', // Ensure this path is correct
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     backgroundRepeat: 'no-repeat', // Optional, prevents repeating the image
        // }}
        >
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Welcome Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cardClasses}>
                    <FaUserMd className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Doctor List</h3>
                    <Link to="/admin/doctorlist" className={textClasses}>
                        View Doctors
                    </Link>
                </div>
                <div className={cardClasses}>
                    <FaUserInjured className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Patient List</h3>
                    <Link to="/admin/patientlist" className={textClasses}>
                        View Patients
                    </Link>
                </div>
                <div className={cardClasses}>
                    <FaCalendarAlt className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Appointment Details</h3>
                    <Link to="/admin/appointments" className={textClasses}>
                        View Appointments
                    </Link>
                </div>
                <div className={cardClasses}>
                    <FaUserPlus className="text-5xl text-blue-600 mb-4 mx-auto" />
                    <h3 className={headingClasses}>Manage Doctors</h3>
                    <Link to="/admin/add-doctor" className={textClasses}>
                        Add Doctors
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
