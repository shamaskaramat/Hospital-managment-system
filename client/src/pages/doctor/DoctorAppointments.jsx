import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorAppointment } from '../../redux/Actions/DoctorAction';

const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden';
const tableCellClass = 'py-3 px-4 border-b';

const DoctorAppointments = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector((state) => state.doctorappointments);

    useEffect(() => {
        dispatch(getDoctorAppointment());
    }, [dispatch]);
    console.log('Appointments from Redux State:', appointments);

    if (loading) return <div>Loading...</div>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="overflow-x-auto w-full px-10 mt-10">
            {/* <h2 className='text-center mb-10 text-3xl font-serif font-bold text-blue-400'>Welcome Doctor</h2> */}
            <table className={tableClass}>
                <thead>
                    <tr className="bg-blue-100">
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Patient Name</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Email</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <tr key={appointment._id} className="bg-gray-50">
                                <td className={tableCellClass}>{appointment?.patient?.name}</td>
                                <td className={tableCellClass}>{appointment.patient.email}</td>
                                <td className={tableCellClass}>{new Date(appointment.date).toLocaleDateString()}</td>
                                <td className={tableCellClass}>{appointment.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">
                                No appointments available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorAppointments;
