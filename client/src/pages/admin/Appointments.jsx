import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaSearch, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAppointments } from '../../redux/Actions/AppointmentAction';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table generation in PDF

const inputClass = 'border border-zinc-300 rounded-lg p-2 flex-grow';
const buttonClass = 'bg-blue-600 text-white p-2 rounded-lg ml-2 hover:bg-blue-700 transition-colors duration-200 flex items-center';
const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden';
const tableCellClass = 'py-3 px-4 border-b';

const ITEMS_PER_PAGE = 10;

const Appointments = () => {
    const dispatch = useDispatch();
    const { appointments, status, error } = useSelector((state) => state.allappointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllAppointments());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (appointments) {
            const filtered = appointments.filter((appointment) =>
                (appointment?.contact || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAppointments(filtered);
        }
    }, [appointments, searchTerm]);

    // Calculate paginated records
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const exportToCSV = () => {

        const csvData = filteredAppointments.map((appointment) => ({
            'Patient Name': appointment?.patientDetails?.name || 'N/A',
            'Patient Email': appointment?.patientDetails?.email || 'N/A',
            'Doctor Name': appointment?.doctorDetails?.name || 'N/A',
            'Doctor Email': appointment?.doctorDetails?.email || 'N/A',
            'Consultancy Fees': appointment?.doctorDetails?.fees || 'N/A',
            'Appointment Date': appointment?.date ? new Date(appointment.date).toLocaleDateString('en-US') : 'N/A',
            'Appointment Time': appointment?.time ? new Date(`1970-01-01T${appointment.time}Z`).toLocaleTimeString('en-US') : 'N/A',
            'Status': appointment?.status || 'N/A'
        }));

        // Convert to CSV
        const csv = Papa.unparse(csvData);

        // Create and download CSV file
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'appointments.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Appointment Details', 14, 22);

        const tableData = filteredAppointments.map((appointment) => ([
            appointment?.patientDetails?.name || 'N/A',
            appointment?.patientDetails?.email || 'N/A',
            appointment?.doctorDetails?.name || 'N/A',
            appointment?.doctorDetails?.email || 'N/A',
            appointment?.doctorDetails?.fees || 'N/A',
            appointment?.date ? new Date(appointment.date).toLocaleDateString('en-US') : 'N/A',
            appointment?.time ? new Date(`1970-01-01T${appointment.time}Z`).toLocaleTimeString('en-US') : 'N/A',
            appointment?.status || 'N/A'
        ]));

        doc.autoTable({
            head: [['Patient Name', 'Patient Email', 'Doctor Name', 'Doctor Email', 'Consultancy Fees', 'Appointment Date', 'Appointment Time', 'Status']],
            body: tableData,
            startY: 30
        });

        doc.save('appointments.pdf');
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="flex-1 p-8 bg-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Appointment Details
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* <div className="mb-6 flex flex-col md:flex-row md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by contact"
                        className={inputClass}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className={buttonClass}>
                        <FaSearch className="mr-2" />
                        Search
                    </button>
                </div> */}
                <div className="flex mb-4">
                    <button
                        className={`${buttonClass} mr-2`}
                        onClick={exportToCSV}
                    >
                        <FaFileCsv className="mr-2" />
                        Export CSV
                    </button>
                    <button
                        className={buttonClass}
                        onClick={exportToPDF}
                    >
                        <FaFilePdf className="mr-2" />
                        Export PDF
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className={tableClass}>
                        <thead>
                            <tr className="bg-blue-100">
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Patient Name</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Patient Email</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doctor Name</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doctor Email</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Consultancy Fees</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                                <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((appointment, index) => (
                                    <tr key={appointment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className={tableCellClass}>{appointment?.patientDetails?.name || 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.patientDetails?.email || 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.doctorDetails?.name || 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.doctorDetails?.email || 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.doctorDetails?.fees || 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.date ? new Date(appointment.date).toLocaleDateString('en-US') : 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.time ? new Date(`1970-01-01T${appointment.time}Z`).toLocaleTimeString('en-US') : 'N/A'}</td>
                                        <td className={tableCellClass}>{appointment?.status || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-3 px-4 text-center">No appointments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1 hover:bg-blue-700"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 rounded-lg ${index + 1 === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-1 hover:bg-blue-700"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
