import React from 'react';
import { FaUserMd, FaUserInjured, FaCalendarAlt } from 'react-icons/fa';
import { FaBuildingColumns } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const cardClasses = 'bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 flex flex-col items-center max-w-xs mx-auto w-full';
const headingClasses = 'text-lg font-semibold text-blue-700 mb-2';
const textClasses = 'text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200 group';
const iconClasses = 'text-4xl text-blue-500 mb-4';

const MainContent = () => {
    return (
        <main className="flex-1 p-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Welcome Admin</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    icon={<FaUserMd className={iconClasses} />}
                    title="Doctor List"
                    link="/admin/manage-doctors"
                    linkText="View Doctors"
                />
                <Card
                    icon={<FaUserInjured className={iconClasses} />}
                    title="Patient List"
                    link="/admin/patientlist"
                    linkText="View Patients"
                />
                <Card
                    icon={<FaCalendarAlt className={iconClasses} />}
                    title="Appointment Details"
                    link="/admin/appointments"
                    linkText="View Appointments"
                />
                <Card
                    icon={<FaBuildingColumns className={iconClasses} />}
                    title="Manage Departments"
                    link="/admin/departments"
                    linkText="Departments"
                />
            </div>
        </main>
    );
};

const Card = ({ icon, title, link, linkText }) => (
    <div className={cardClasses}>
        {icon}
        <h3 className={headingClasses}>{title}</h3>
        <Link to={link} className={textClasses}>
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </Link>
    </div>
);

export default MainContent;