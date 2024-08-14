import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: false },
    password: { type: String, required: true },
    appointments: [{
        appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
        date: { type: Date },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
    }],
    permissions: {
        canCreateAppointments: { type: Boolean, default: true },
        canViewOwnAppointments: { type: Boolean, default: true },
        canSendMessagesToAdmin: { type: Boolean, default: true },
        canViewDepartments: { type: Boolean, default: true },

    },
    otp: { type: String },
    otpExpires: { type: Date },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]


});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
