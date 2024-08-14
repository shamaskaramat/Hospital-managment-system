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
} from "../Constants/DoctorConstant";


const initialStatelogin = {
    token: '',
    errors: '',
    loading: false,
};

export const DoctorLoginReducer = (state = initialStatelogin, action) => {
    switch (action.type) {
        case GET_DOCTOR_LOGIN_DATA_REQUEST:
            return { ...state, loading: true };
        case GET_DOCTOR_LOGIN_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                errors: '',
            };
        case GET_DOCTOR_LOGIN_DATA_REQUEST_FAIL:
        case GET_DOCTOR_LOGIN_DATA_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload?.message || 'An error occurred',
            };
        default:
            return state;
    }
};







// const initialState = {
//     loading: false,
//     doctors: [],
//     error: null,
// };

// export const doctorReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_DOCTORS_REQUEST:
//         case ADD_DOCTOR_REQUEST:
//         case UPDATE_DOCTOR_REQUEST:
//         case DELETE_DOCTOR_REQUEST:
//             return { ...state, loading: true, error: null };
//         case GET_DOCTORS_SUCCESS:
//             return { ...state, loading: false, doctors: action.payload };
//         case ADD_DOCTOR_SUCCESS:
//             return { ...state, loading: false, doctors: [...state.doctors, action.payload] };
//         case UPDATE_DOCTOR_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 doctors: state.doctors.map(doctor =>
//                     doctor._id === action.payload._id ? action.payload : doctor
//                 ),
//             };
//         case DELETE_DOCTOR_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 doctors: state.doctors.filter(doctor => doctor._id !== action.payload),
//             };
//         case GET_DOCTORS_FAILURE:
//         case ADD_DOCTOR_FAILURE:
//         case UPDATE_DOCTOR_FAILURE:
//         case DELETE_DOCTOR_FAILURE:
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };


const initialState = {
    loading: false,
    doctors: [],
    error: null,
};

export const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTORS_REQUEST:
        case ADD_DOCTOR_REQUEST:
        case UPDATE_DOCTOR_REQUEST:
        case DELETE_DOCTOR_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DOCTORS_SUCCESS:
            return { ...state, loading: false, doctors: action.payload };
        case ADD_DOCTOR_SUCCESS:
            return { ...state, loading: false, doctors: [...state.doctors, action.payload] };
        case UPDATE_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: state.doctors.map(doctor =>
                    doctor._id === action.payload._id ? action.payload : doctor
                ),
            };
        case DELETE_DOCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: state.doctors.filter(doctor => doctor._id !== action.payload),
            };
        case GET_DOCTORS_FAILURE:
        case ADD_DOCTOR_FAILURE:
        case UPDATE_DOCTOR_FAILURE:
        case DELETE_DOCTOR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
