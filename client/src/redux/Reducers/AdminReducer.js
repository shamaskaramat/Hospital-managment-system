// import {
//     GET_PATIENT_LOGIN_DATA_REQUEST,
//     GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS,
//     GET_PATIENT_LOGIN_DATA_REQUEST_FAIL,
//     GET_PATIENT_LOGIN_DATA_REQUEST_ERROR,
// } from '../Constants/PatientConstant';

import { GET_ALL_MESSAGES_FAILURE, GET_ALL_MESSAGES_REQUEST, GET_ALL_MESSAGES_SUCCESS } from "../Constants/AuthConstant";

// const initialState = {
//     email: '',
//     password: '',
//     loading: false,
//     errors: '',
//     token: null,
// };

// const patientLoginReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_PATIENT_LOGIN_DATA_REQUEST:
//             return { ...state, loading: true, errors: '' };
//         case GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS:
//             return { ...state, loading: false, token: action.payload.token };
//         case GET_PATIENT_LOGIN_DATA_REQUEST_FAIL:
//             return { ...state, loading: false, errors: 'Login failed.' };
//         case GET_PATIENT_LOGIN_DATA_REQUEST_ERROR:
//             return { ...state, loading: false, errors: 'An error occurred.' };
//         default:
//             return state;
//     }
// };

// export default patientLoginReducer;



const initialStateMessageList = {
    messages: [],
    status: 'idle',
    error: null,
};


export const messagesListReducer = (state = initialStateMessageList, action) => {
    switch (action.type) {
        case GET_ALL_MESSAGES_REQUEST:
            return { ...state, status: 'loading' };
        case GET_ALL_MESSAGES_SUCCESS:
            return { ...state, status: 'succeeded', messages: action.payload };
        case GET_ALL_MESSAGES_FAILURE:
            return { ...state, status: 'failed', error: action.payload };
        default:
            return state;
    }
};
