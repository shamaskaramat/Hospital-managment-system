// // src/redux/reducers/authReducer.js
// import {
//     GET_PATIENT_LOGIN_DATA_REQUEST,
//     GET_PATIENT_LOGIN_DATA_REQUEST_SUCCESS,
//     GET_PATIENT_LOGIN_DATA_REQUEST_FAIL,
//     GET_PATIENT_LOGIN_DATA_REQUEST_ERROR,
// } from '../Constants/PatientConstant';

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
