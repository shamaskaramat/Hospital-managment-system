import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/AuthReducer';
import {
    messageReducer,
    PatientAuthReducer,
    PatientForgotPasswordReducer,
    PatientRegisterReducer,
    patientResetPasswordReducer,
    // patientsListReducer,
    patientsListReducer
} from './Reducers/PatientReducer';
import {
    appointmentsOfDoctorReducer,
    DoctorLoginReducer,
    doctorReducer
} from "./Reducers/DoctorReducer"
import { departmentReducer } from './Reducers/DepartmentReducer';
import { allappointmentReducer, appointmentReducer } from './Reducers/AppointmentReducer';
import themeReducer from './Reducers/ThemeReducer';
import { messagesListReducer } from './Reducers/AdminReducer';
// import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        patientAuth: PatientAuthReducer,
        patientRegisterAuth: PatientRegisterReducer,
        patientForgotpass: PatientForgotPasswordReducer,
        patientresetpass: patientResetPasswordReducer,
        doctor: DoctorLoginReducer,
        department: departmentReducer,
        doctorstate: doctorReducer,
        appointments: appointmentReducer,
        message: messageReducer,
        theme: themeReducer,
        allappointments: allappointmentReducer,
        patientsList: patientsListReducer,
        messagesList: messagesListReducer,
        doctorappointments: appointmentsOfDoctorReducer


    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});
