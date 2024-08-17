import {
    GET_APPOINTMENT_BY_ID_REQUEST,
    GET_APPOINTMENT_BY_ID_SUCCESS,
    GET_APPOINTMENT_BY_ID_FAILURE,
    GET_ALL_APPOINTMENTS_REQUEST,
    GET_ALL_APPOINTMENTS_SUCCESS,
    GET_ALL_APPOINTMENTS_FAILURE,
} from '../Constants/AppointmentConstant';

const initialState = {
    loading: false,
    appointments: [], // Assuming you're storing a list of appointments
    error: null,
};

export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_APPOINTMENT_BY_ID_SUCCESS:
            return { ...state, loading: false, appointments: action.payload }; // Update the state with fetched appointments
        case GET_APPOINTMENT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


//get apppointments

const initialStateallappointments = {
    appointments: [],
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
};

export const allappointmentReducer = (state = initialStateallappointments, action) => {
    switch (action.type) {
        case GET_ALL_APPOINTMENTS_REQUEST:
            return {
                ...state,
                status: 'loading',
            };
        case GET_ALL_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                status: 'succeeded',
                appointments: action.payload,
            };
        case GET_ALL_APPOINTMENTS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        default:
            return state;
    }
};


