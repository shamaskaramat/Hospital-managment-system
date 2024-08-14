import express from 'express';
import connectDB from './Database/db.js';
import dotenv from "dotenv"
const app = express();
import adminRoutes from './routes/admin.route.js';
import departmentRoutes from './routes/department.route.js';
import doctorRoutes from './routes/doctor.route.js';
import patientRoutes from './routes/patient.route.js';
import appointmentRoutes from './routes/appointment.route.js';
import cors from 'cors'
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database connection
connectDB()

//admin 
app.use('/api/admin', adminRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});