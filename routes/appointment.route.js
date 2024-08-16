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
// router.use(authenticate)
// router.use(authenticatePatient);
router.post('/create', authenticatePatient, authorize(['canViewDoctors', 'canCreateAppointments']), createAppointment);
router.get('/getall', authenticatePatient, authorize(['canViewOwnAppointments']), getAllAppointments);
router.get('/patient-appointments', authenticatePatient, authorize(['canViewOwnAppointments']), getPatientAppointments);
router.get('/appointments-details', authenticate, authorize(['canViewAllAppointments']), AppointmentDetails);

// router.get('/getbyid/:id', authorize(['canViewOwnAppointments']), getAllAppointments);


export default router;
