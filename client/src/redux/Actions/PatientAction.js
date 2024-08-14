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
    RESET_PASSWORD_REQUEST_ERROR
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
        console.log(response)
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