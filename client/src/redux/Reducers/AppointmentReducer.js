// src/redux/Reducers/AppointmentReducer.js

import {
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAILURE,
    GET_APPOINTMENT_BY_ID_REQUEST,
    GET_APPOINTMENT_BY_ID_SUCCESS,
    GET_APPOINTMENT_BY_ID_FAILURE,
} from '../Constants/AppointmentConstant';

const initialState = {
    loading: false,
    appointment: null,
    appointments: [], // In case you need to store a list of appointments
    error: null,
};

export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_REQUEST:
        case GET_APPOINTMENT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, appointment: action.payload };
        case GET_APPOINTMENT_BY_ID_SUCCESS:
            return { ...state, loading: false, appointment: action.payload };
        case CREATE_APPOINTMENT_FAILURE:
        case GET_APPOINTMENT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
