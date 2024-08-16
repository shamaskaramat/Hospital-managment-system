import express from 'express';
import {
    createDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctorAppointments,
    loginDoctor,
    updateDoctor,
} from '../controllers/doctor.controller.js';
import { authorize } from '../middlewares/Authorization.js';
import { authenticate } from '../middlewares/authenticate.js';
import upload from '../upload/multerConfig.js';

const router = express.Router();
//public route for doctor
router.post('/login', loginDoctor);
router.get('/getallappointment', authenticate, authorize(['canViewOwnAppointments', 'canViewDepartment']), getDoctorAppointments);

// router.use(authenticate);

router.post('/create', authenticate, authorize(['canCreateDoctor']), upload.single('doctorPhoto'), createDoctor);
router.get('/getall', authenticate, authorize(['canViewDoctorList']), getAllDoctors);
router.delete('/delete/:id', authenticate, authorize(['canDeleteDoctor']), deleteDoctor);
router.put('/update/:id', authenticate, authorize(['canUpadateDoctors']), upload.single('doctorPhoto'), updateDoctor);

// // Route to update a doctor by ID
// router.put('/:id', authorize(['canManageDoctors']), updateDoctor);

// // Route to delete a doctor by ID
// router.delete('/:id', authorize(['canManageDoctors']), deleteDoctor);

export default router;
