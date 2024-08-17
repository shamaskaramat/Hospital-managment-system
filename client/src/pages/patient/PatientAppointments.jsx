import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../redux/Actions/DoctorAction';
import { createAppointment } from '../../redux/Actions/AppointmentAction';
import moment from 'moment'; // Import Moment.js

const sharedClasses = {
    input: 'border border-zinc-300 rounded p-2 mb-4 w-full',
    button: 'bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700',
};

const PatientAppointments = () => {
    const dispatch = useDispatch();
    const { loading: docLoading, doctors, error: docError } = useSelector((state) => state.doctorstate);
    const { loading, error } = useSelector((state) => state.appointments);

    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [formErrors, setFormErrors] = useState('');

    useEffect(() => {
        dispatch(getDoctors());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!doctor || !date || !time) {
            setFormErrors('Please fill in all fields.');
            return;
        }
        setFormErrors('');

        const formattedDate = moment(date).format('DD-MM-YYYY');

        const formattedTime = moment(time, 'HH:mm').format('hh:mm A');  // Assuming time is in 24-hour format

        const appointmentData = { doctor, date: formattedDate, time: formattedTime };
        dispatch(createAppointment(appointmentData)).then(() => {
            setDoctor('');
            setDate('');
            setTime('');
        }).catch((err) => {
            console.error('Appointment creation failed:', err);
        });
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md mx-auto h-1/2 mt-24">
            <h2 className="text-xl font-semibold mb-4">Create an Appointment</h2>
            {formErrors && <p className="text-red-500 mb-4">{formErrors}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {docError && <p className="text-red-500 mb-4">{docError}</p>}
            {docLoading ? (
                <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Doctors:</label>
                    <select
                        className={sharedClasses.input}
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>{doc.name}</option>
                        ))}
                    </select>

                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={sharedClasses.input}
                    />

                    <label className="block mb-2">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={sharedClasses.input}
                    />

                    <button type="submit" className={sharedClasses.button} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Appointment'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PatientAppointments;
