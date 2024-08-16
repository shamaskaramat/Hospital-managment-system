import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAILURE,
    GET_APPOINTMENT_BY_ID_REQUEST,
    GET_APPOINTMENT_BY_ID_SUCCESS,
    GET_APPOINTMENT_BY_ID_FAILURE,
    GET_ALL_APPOINTMENTS_REQUEST,
    GET_ALL_APPOINTMENTS_SUCCESS,
    GET_ALL_APPOINTMENTS_FAILURE,
} from '../Constants/AppointmentConstant';

const getAuthToken = () => {
    return Cookies.get('authToken');
};

// Create Appointment
export const createAppointment = (appointmentData) => async (dispatch) => {
    dispatch({ type: CREATE_APPOINTMENT_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.post('http://localhost:8000/api/appointment/create', appointmentData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: CREATE_APPOINTMENT_SUCCESS, payload: response.data });
        toast.success('Appointment created successfully!');
    } catch (error) {
        dispatch({ type: CREATE_APPOINTMENT_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to create appointment');
    }
};

// Get Appointment by ID
export const getAppointmentById = () => async (dispatch) => {
    dispatch({ type: GET_APPOINTMENT_BY_ID_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`http://localhost:8000/api/appointment/patient-appointments`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        dispatch({ type: GET_APPOINTMENT_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_APPOINTMENT_BY_ID_FAILURE, payload: error.response?.data?.message || error.message });
    }
};



// Fetch All Appointments
export const fetchAllAppointments = () => async (dispatch) => {
    dispatch({ type: GET_ALL_APPOINTMENTS_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get(`http://localhost:8000/api/appointment/appointments-details`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: GET_ALL_APPOINTMENTS_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_ALL_APPOINTMENTS_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to fetch appointments');
    }
};