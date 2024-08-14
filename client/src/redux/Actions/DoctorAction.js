// src/redux/Actions/DoctorAction.js

import axios from 'axios';
import { toast } from 'react-toastify';
import {
    ADD_DOCTOR_FAILURE,
    ADD_DOCTOR_REQUEST,
    ADD_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILURE,
    DELETE_DOCTOR_REQUEST,
    DELETE_DOCTOR_SUCCESS,
    GET_DOCTOR_LOGIN_DATA_REQUEST,
    GET_DOCTOR_LOGIN_DATA_REQUEST_ERROR,
    GET_DOCTOR_LOGIN_DATA_REQUEST_FAIL,
    GET_DOCTOR_LOGIN_DATA_REQUEST_SUCCESS,
    GET_DOCTORS_FAILURE,
    GET_DOCTORS_REQUEST,
    GET_DOCTORS_SUCCESS,
    UPDATE_DOCTOR_FAILURE,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS
} from '../Constants/DoctorConstant';
import Cookies from 'js-cookie';


export const doctorLogin = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: GET_DOCTOR_LOGIN_DATA_REQUEST });

        const response = await axios.post('http://localhost:8000/api/doctor/login', loginData);

        if (response.data.success) {
            toast.success('Login successful!');
            dispatch({
                type: GET_DOCTOR_LOGIN_DATA_REQUEST_SUCCESS,
                payload: response.data,
            });
            navigate('/doctor');
        } else {
            dispatch({ type: GET_DOCTOR_LOGIN_DATA_REQUEST_FAIL });
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch({ type: GET_DOCTOR_LOGIN_DATA_REQUEST_ERROR });
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};


const getAuthToken = () => {
    return Cookies.get('authToken');
};
// Get Doctors
export const getDoctors = () => async (dispatch) => {
    dispatch({ type: GET_DOCTORS_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:8000/api/doctor/getall', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        dispatch({ type: GET_DOCTORS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DOCTORS_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Add Doctor
export const addDoctor = (doctorData) => async (dispatch) => {
    dispatch({ type: ADD_DOCTOR_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post('http://localhost:8000/api/doctor/create', doctorData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: ADD_DOCTOR_SUCCESS, payload: response.data });
        toast.success('Doctor added successfully!');
    } catch (error) {
        dispatch({ type: ADD_DOCTOR_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to add doctor');
    }
};

// Update Doctor
export const updateDoctor = (id, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_DOCTOR_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.put(`http://localhost:8000/api/doctor/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: UPDATE_DOCTOR_SUCCESS, payload: response.data });
        toast.success('Doctor updated successfully!');
    } catch (error) {
        dispatch({ type: UPDATE_DOCTOR_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to update doctor');
    }
};

// Delete Doctor
export const deleteDoctor = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DOCTOR_REQUEST });

    try {
        const token = getAuthToken();
        await axios.delete(`http://localhost:8000/api/doctor/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_DOCTOR_SUCCESS, payload: id });
        toast.success('Doctor deleted successfully!');
    } catch (error) {
        dispatch({ type: DELETE_DOCTOR_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to delete doctor');
    }
};