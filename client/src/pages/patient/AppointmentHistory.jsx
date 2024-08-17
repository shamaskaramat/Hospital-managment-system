import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppointmentById } from '../../redux/Actions/AppointmentAction';
import { Parser } from '@json2csv/plainjs';
import { saveAs } from 'file-saver';

const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden';
const tableCellClass = 'py-3 px-4 border-b';

const AppointmentHistory = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.appointments);

    useEffect(() => {
        dispatch(getAppointmentById());
    }, [dispatch]);

    const handleExport = () => {
        try {
            // Prepare data for CSV
            const csvData = appointments.map(appointment => ({
                'Doctor Name': appointment.doctor?.name || 'N/A',
                'Doctor Email': appointment.doctor?.email || 'N/A',
                'Consultancy Fees': appointment.doctor?.fees || 'N/A',
                'Appointment Date': new Date(appointment.date).toLocaleDateString(),
                'Appointment Time': appointment.time,
            }));

            // Convert JSON to CSV using json2csv
            const parser = new Parser();
            const csv = parser.parse(csvData);

            // Create a blob and save the file
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            saveAs(blob, 'appointments.csv');
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    };

    return (
        <div className="overflow-x-auto w-full px-4 sm:px-10 mt-10">
            {/* <h2 className='text-center mb-10 text-3xl font-serif font-bold text-blue-400'>History of your appointments</h2> */}
            {loading && <p className="text-center text-blue-400">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            <button
                onClick={handleExport}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
            >
                Export as CSV
            </button>
            <table className={tableClass}>
                <thead>
                    <tr className="bg-blue-100">
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doctor Name</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Doctor Email</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Consultancy Fees</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className={tableCellClass}>{appointment.doctor?.name || 'N/A'}</td>
                                <td className={tableCellClass}>{appointment.doctor?.email || 'N/A'}</td>
                                <td className={tableCellClass}>{appointment.doctor?.fees || 'N/A'}</td>
                                <td className={tableCellClass}>{new Date(appointment.date).toLocaleDateString()}</td>
                                <td className={tableCellClass}>{appointment.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={`${tableCellClass} text-center text-gray-500`}>No appointments available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentHistory;
