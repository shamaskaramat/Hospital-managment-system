import Appointment from "../models/appointment.model.js";
import moment from 'moment';
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";



// export const createAppointment = async (req, res) => {
//     try {
//         let { doctorId, date, time, status, departmentId } = req.body;
//         let patient = req.user._id;
//         // console.log(patient)

//         // if (!doctor || !date || !time || !status) {
//         //     return res.status(400).json({ message: 'Patient, doctor, date, time, and status are required' });
//         // }
//         const formattedDate = moment(date, 'DD-MM-YYYY', true);
//         if (!formattedDate.isValid()) {
//             return res.status(400).json({ message: 'Invalid date format. Use DD-MM-YYYY.' });
//         }
//         const formattedTime = moment(time, 'hh:mm A', true);
//         if (!formattedTime.isValid()) {
//             return res.status(400).json({ message: 'Invalid time format. Use hh:mm AM/PM.' });
//         }

//         // Create new appointment
//         const newAppointment = new Appointment({
//             patient,
//             doctorId,
//             date: formattedDate.toDate(),
//             time: formattedTime.format('HH:mm'),
//             status,
//             departmentId
//         });

//         await newAppointment.save();
//         // await Patient.findByIdAndUpdate(
//         //     patient,
//         //     { $push: { appointments: newAppointment._id } },
//         //     { new: true }
//         // );
//         await Promise.all([
//             Patient.findByIdAndUpdate(
//                 patient,
//                 { $push: { appointments: newAppointment._id } },
//                 { new: true }
//             ),
//             Doctor.findByIdAndUpdate(
//                 doctorId,
//                 { $push: { appointments: newAppointment._id } },
//                 { new: true }
//             )
//         ]);

//         // Populate fields
//         const populatedAppointment = await Appointment.findById(newAppointment._id)
//             .populate('doctor', 'name') // Populate doctor name
//             .populate('department', 'name') // Populate department name
//             .exec();
//         res.status(201).json({ success: true, message: "Appointment has been created", appointment: populatedAppointment })
//         // .populate({
//         //     path: 'departmentId',
//         //     select: 'name'
//         // })
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments and populate patient and doctor details
        const appointments = await Appointment.find()
            .populate('patient', 'name email') // Adjust fields as needed
            .populate('doctor', 'name email fees'); // Adjust fields as needed

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//get all appointment associated with specific patient

export const getPatientAppointments = async (req, res) => {
    try {
        // Extract patient ID from the authenticated user
        const patientId = req.user._id;

        // Fetch all appointments for the specific patient and populate doctor details
        const appointments = await Appointment.find({ patient: patientId })
            .populate('doctor', 'name email fees'); // Populate doctor details

        // Check if any appointments were found
        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this patient.' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get appointment details

export const AppointmentDetails = async (req, res) => {
    try {
        // Aggregation pipeline
        const appointments = await Appointment.aggregate([
            // Join with Patient collection
            {
                $lookup: {
                    from: 'patients', // The name of the Patient collection
                    localField: 'patient',
                    foreignField: '_id',
                    as: 'patientDetails'
                }
            },
            {
                $unwind: '$patientDetails' // Unwind the array to get a single object
            },
            // Join with Doctor collection
            {
                $lookup: {
                    from: 'doctors', // The name of the Doctor collection
                    localField: 'doctor',
                    foreignField: '_id',
                    as: 'doctorDetails'
                }
            },
            {
                $unwind: '$doctorDetails' // Unwind the array to get a single object
            },
            // Project the fields you want in the final result
            {
                $project: {
                    _id: 1,
                    date: 1,
                    time: 1,
                    status: 1,
                    'patientDetails.name': 1,
                    'patientDetails.email': 1,
                    'doctorDetails.name': 1,
                    'doctorDetails.email': 1,
                    'doctorDetails.fees': 1
                }
            }
        ]);

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const createAppointment = async (req, res) => {
    try {
        let { doctorId, date, time, status, departmentId } = req.body;
        let patient = req.user._id;

        const formattedDate = moment(date, 'DD-MM-YYYY', true);
        if (!formattedDate.isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Use DD-MM-YYYY.' });
        }
        const formattedTime = moment(time, 'hh:mm A', true);
        if (!formattedTime.isValid()) {
            return res.status(400).json({ message: 'Invalid time format. Use hh:mm AM/PM.' });
        }

        // Create new appointment
        const newAppointment = new Appointment({
            patient,
            doctor: doctorId, // Ensure this matches the schema
            date: formattedDate.toDate(),
            time: formattedTime.format('HH:mm'),
            status,
            department: departmentId // Ensure this matches the schema
        });

        await newAppointment.save();

        await Promise.all([
            Patient.findByIdAndUpdate(
                patient,
                { $push: { appointments: newAppointment._id } },
                { new: true }
            ),
            Doctor.findByIdAndUpdate(
                doctorId,
                { $push: { appointments: newAppointment._id } },
                { new: true }
            )
        ]);

        // Populate fields
        const populatedAppointment = await Appointment.findById(newAppointment._id)
            .populate('doctor', 'name') // Populate doctor name
            .populate('department', 'name') // Populate department name
            .exec();

        res.status(201).json({ success: true, message: "Appointment has been created", appointment: populatedAppointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};