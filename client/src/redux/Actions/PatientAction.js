// src/redux/actions/authActions.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
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
    RESET_PASSWORD_REQUEST_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST_FAIL,
    RESET_PASSWORD_REQUEST_ERROR,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    GET_PATIENT_LIST_REQUEST,
    GET_PATIENT_LIST_SUCCESS,
    GET_PATIENT_LIST_FAILURE
} from '../Constants/PatientConstant';
// import {  } from '../Constants/AuthConstant';

export const loginPatient = (PatientLogin, navigate) => async (dispatch) => {
    try {
        dispatch({ type: GET_PATIENT_LOGIN_DATA_REQUEST });

        const response = await axios.post('http://localhost:8000/api/patient/login', PatientLogin);

        if (response.data.success) {
            const { token } = response.data;
            console.log(token)
            toast.success('Login successful!');
            Cookies.set('authToken', token);
            dispatch({
                type: GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS,
                payload: response.data,
            });
            navigate('/patient');
        } else {
            dispatch({ type: GET_PATIENT_LOGIN_DATA_REQUEST_FAIL });
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch({ type: GET_PATIENT_LOGIN_DATA_REQUEST_ERROR });
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};




export const registerPatient = (userData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: GET_PATIENT_REGISTER_DATA_REQUEST });

        const response = await axios.post('http://localhost:8000/api/patient/create', userData);

        if (response.data.success) {
            toast.success('Registration successful!');
            dispatch({
                type: GET_PATIENT_REGISTER_DATA_REQUEST_SUCCESS,
                payload: response.data,
            });
            navigate('/');
        } else {
            dispatch({ type: GET_PATIENT_REGISTER_DATA_REQUEST_FAIL });
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch({ type: GET_PATIENT_REGISTER_DATA_REQUEST_ERROR });
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};



export const forgotPassword = (email, navigate) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const response = await axios.post('http://localhost:8000/api/patient/forget-password', { email });

        console.log(response)

        if (response.data.success) {
            toast.success('Password reset OTP sent to your email!');
            dispatch({
                type: FORGOT_PASSWORD_REQUEST_SUCCESS,
                payload: response.data,
            });
            navigate('/reset');
        } else {
            dispatch({ type: FORGOT_PASSWORD_REQUEST_FAIL });
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_REQUEST_ERROR });
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};


export const resetPassword = (otp, newPassword, navigate) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const response = await axios.post('http://localhost:8000/api/patient/reset-password', { otp, newPassword });
        // console.log(response)
        if (response.data.success) {
            toast.success('Password has been reset successfully!');
            dispatch({
                type: RESET_PASSWORD_REQUEST_SUCCESS,
                payload: response.data,
            });
            navigate('/');
        } else {
            dispatch({ type: RESET_PASSWORD_REQUEST_FAIL });
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_REQUEST_ERROR });
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};



const getAuthToken = () => Cookies.get('authToken');

// Send Message
export const sendMessage = (messageData) => async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });

    try {
        const token = getAuthToken();

        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const response = await axios.post('http://localhost:8000/api/patient/send-message', messageData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: response.data });
        toast.success('Message sent successfully!');
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        dispatch({ type: SEND_MESSAGE_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};


//patients List


export const fetchPatientList = () => async (dispatch) => {
    dispatch({ type: GET_PATIENT_LIST_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:8000/api/patient/patients', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: GET_PATIENT_LIST_SUCCESS, payload: response.data.patients });
    } catch (error) {
        dispatch({ type: GET_PATIENT_LIST_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to fetch patient list');
    }
};
