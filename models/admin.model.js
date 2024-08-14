import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    permissions: {
        canCreateDoctor: { type: Boolean, default: true },
        canDeleteDoctor: { type: Boolean, default: true },
        canViewDoctors: { type: Boolean, default: true },
        canUpadateDoctors: { type: Boolean, default: true },
        canViewPatientList: { type: Boolean, default: true },
        canViewDoctorList: { type: Boolean, default: true },
        canViewAllAppointments: { type: Boolean, default: true },
        canCreateDepartment: { type: Boolean, default: true },
        canDeleteDepartment: { type: Boolean, default: true },
        canUpdateDepartments: { type: Boolean, default: true },
        canViewDepartments: { type: Boolean, default: true },
        canViewAllMessages: { type: Boolean, default: true },
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin
