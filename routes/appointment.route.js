import express from 'express';
import {
    AppointmentDetails,
    createAppointment,
    getAllAppointments,
    getPatientAppointments,

} from '../controllers/appointment.controller.js';
import { authorize } from '../middlewares/Authorization.js';
import { authenticate, authenticatePatient } from '../middlewares/authenticate.js';

const router = express.Router();
router.use(authenticate)
router.get('/appointments-details', authorize(['canViewAllAppointments']), AppointmentDetails);
// router.use(authenticatePatient);
router.post('/create', authenticatePatient, authorize(['canCreateAppointments']), createAppointment);
router.get('/getall', authorize(['canViewOwnAppointments']), getAllAppointments);
router.get('/patient-appointments', authorize(['canViewOwnAppointments']), getPatientAppointments);
// router.get('/getbyid/:id', authorize(['canViewOwnAppointments']), getAllAppointments);

// // Route to get an appointment by ID
// router.get('/:id', authorize(['canViewAppointments']), getAppointmentById);

// // Route to update an appointment by ID
// router.put('/:id', authorize(['canManageAppointments']), updateAppointment);

// // Route to delete an appointment by ID
// router.delete('/:id', authorize(['canManageAppointments']), deleteAppointment);

export default router;
