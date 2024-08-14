import express from 'express';
import {
    createPatient,
    forgetPassword,
    getPatientList,
    login,
    resetPassword,
    sendMessage,
} from '../controllers/patient.controller.js';
import { authorize } from '../middlewares/Authorization.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Apply authentication middleware to all routes


// Route to create a new patient
router.post('/create', createPatient);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.get('/patients', getPatientList);



// router.use(authenticate);
// router.post('/send-message', sendMessage)
router.post('/send-message', authenticate, sendMessage);



// // Route to get all patients
// router.get('/', authorize(['canViewPatients']), getPatients);

// // Route to get a patient by ID
// router.get('/:id', authorize(['canViewPatients']), getPatientById);

// // Route to update a patient by ID
// router.put('/:id', authorize(['canManagePatients']), updatePatient);

// // Route to delete a patient by ID
// router.delete('/:id', authorize(['canManagePatients']), deletePatient);

export default router;
