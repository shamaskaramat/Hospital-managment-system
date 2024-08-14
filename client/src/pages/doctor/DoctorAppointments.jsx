import React from 'react';

const tableClass = 'min-w-full bg-white border border-zinc-300 rounded-lg overflow-hidden';
const tableCellClass = 'py-3 px-4 border-b';

const dummyData = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        contact: '123-456-7890',
        appointmentDate: '2024-08-15',
        appointmentTime: '10:00 AM',
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        contact: '234-567-8901',
        appointmentDate: '2024-08-16',
        appointmentTime: '11:00 AM',
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        contact: '345-678-9012',
        appointmentDate: '2024-08-17',
        appointmentTime: '1:00 PM',
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        contact: '456-789-0123',
        appointmentDate: '2024-08-18',
        appointmentTime: '2:00 PM',
    },
    // Add more dummy data as needed
];

const DoctorAppointments = () => {
    return (
        <div className="overflow-x-auto w-full px-10 mt-10">
            <h2 className='text-center mb-10 text-3xl font-serif font-bold text-blue-400'>Welcome Doctor</h2>
            <table className={tableClass}>
                <thead>
                    <tr className="bg-blue-100">
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>First Name</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Last Name</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Email</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Contact</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Date</th>
                        <th className={`${tableCellClass} font-semibold text-left text-blue-700`}>Appointment Time</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((appointment, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className={tableCellClass}>{appointment.firstName}</td>
                            <td className={tableCellClass}>{appointment.lastName}</td>
                            <td className={tableCellClass}>{appointment.email}</td>
                            <td className={tableCellClass}>{appointment.contact}</td>
                            <td className={tableCellClass}>{appointment.appointmentDate}</td>
                            <td className={tableCellClass}>{appointment.appointmentTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorAppointments;
