// src/redux/reducers/authReducer.js
// import {  } from '../Constants/AuthConstant';
import {
    GET_PATIENT_LOGIN_DATA_REQUEST,
    GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS,
    GET_PATIENT_LOGIN_DATA_REQUEST_FAIL,
    GET_PATIENT_LOGIN_DATA_REQUEST_ERROR,
    GET_PATIENT_REGISTER_DATA_REQUEST,
    GET_PATIENT_REGISTER_DATA_REQUEST_SUCCESS,
    GET_PATIENT_REGISTER_DATA_REQUEST_FAIL,
    GET_PATIENT_REGISTER_DATA_REQUEST_ERROR,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST_ERROR,
    FORGOT_PASSWORD_REQUEST_FAIL,
    FORGOT_PASSWORD_REQUEST_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST_SUCCESS,
    RESET_PASSWORD_REQUEST_FAIL,
    RESET_PASSWORD_REQUEST_ERROR,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    GET_PATIENT_LIST_REQUEST,
    GET_PATIENT_LIST_SUCCESS,
    GET_PATIENT_LIST_FAILURE
} from '../Constants/PatientConstant';

const initialStateLogin = {
    email: '',
    password: '',
    loading: false,
    errors: '',
    token: null,
};

export const PatientAuthReducer = (state = initialStateLogin, action) => {
    switch (action.type) {
        case GET_PATIENT_LOGIN_DATA_REQUEST:
            return { ...state, loading: true, errors: '' };
        case GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS:
            return { ...state, loading: false, token: action.payload.token };
        case GET_PATIENT_LOGIN_DATA_REQUEST_FAIL:
            return { ...state, loading: false, errors: 'Login failed.' };
        case GET_PATIENT_LOGIN_DATA_REQUEST_ERROR:
            return { ...state, loading: false, errors: 'An error occurred.' };
        default:
            return state;
    }
};



// src/redux/reducers/authReducer.js

const initialStateRegister = {
    loading: false,
    userInfo: null,
    error: null,
};

export const PatientRegisterReducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case GET_PATIENT_REGISTER_DATA_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PATIENT_REGISTER_DATA_REQUEST_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case GET_PATIENT_REGISTER_DATA_REQUEST_FAIL:
            return { ...state, loading: false, error: 'Registration failed' };
        case GET_PATIENT_REGISTER_DATA_REQUEST_ERROR:
            return { ...state, loading: false, error: 'An error occurred' };
        default:
            return state;
    }
};






// const initialState = {
//     loading: false,
//     message: null,
//     error: null,
// };


const initialStateFogotPassword = {
    loading: false,
    error: null,
    success: false,
};

export const PatientForgotPasswordReducer = (state = initialStateFogotPassword, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case FORGOT_PASSWORD_REQUEST_SUCCESS:
            return { ...state, loading: false, message: action.payload.message };
        case FORGOT_PASSWORD_REQUEST_FAIL:
            return { ...state, loading: false, error: 'Failed to send reset link' };
        case FORGOT_PASSWORD_REQUEST_ERROR:
            return { ...state, loading: false, error: 'An error occurred' };
        default:
            return state;
    }
};


const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const patientResetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case RESET_PASSWORD_REQUEST_SUCCESS:
            return { ...state, loading: false, success: true };
        case RESET_PASSWORD_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload };
        case RESET_PASSWORD_REQUEST_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};







const initialStateMessage = {
    loading: false,
    message: null,
    error: null,
};

export const messageReducer = (state = initialStateMessage, action) => {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return { ...state, loading: true };

        case SEND_MESSAGE_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null };

        case SEND_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

//patients list

const initialStatePatientList = {
    patients: [],
    status: 'idle',
    error: null
};
// console.log(patients, 'reduver wala') 
export const patientsListReducer = (state = initialStatePatientList, action) => {
    switch (action.type) {
        case GET_PATIENT_LIST_REQUEST:
            return { ...state, status: 'loading' };
        case GET_PATIENT_LIST_SUCCESS:
            return { ...state, status: 'succeeded', patients: action.payload };
        case GET_PATIENT_LIST_FAILURE:
            return { ...state, status: 'failed', error: action.payload };
        default:
            return state;
    }
};
