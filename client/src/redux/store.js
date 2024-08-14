import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/AuthReducer';
import { PatientAuthReducer, PatientForgotPasswordReducer, PatientRegisterReducer, patientResetPasswordReducer } from './Reducers/PatientReducer';
import { DoctorLoginReducer, doctorReducer } from "./Reducers/DoctorReducer"
import { departmentReducer } from './Reducers/DepartmentReducer';
import { appointmentReducer } from './Reducers/AppointmentReducer';
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
        appointments: appointmentReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});
