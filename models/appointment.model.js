import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
});


const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment
