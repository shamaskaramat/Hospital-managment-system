import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fees: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    doctorProfile: { type: String },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
    permissions: {
        canViewOwnAppointments: { type: Boolean, default: true },
        canManageOwnAppointments: { type: Boolean, default: true },
        canViewDepartment: { type: Boolean, default: true }
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor
