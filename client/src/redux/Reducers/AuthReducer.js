// src/reducers/authReducer.js
import {
    GET_ADMIN_LOGIN_DATA_REQUEST,
    GET_ADMIN_LOGIN_DATA_REQUEST_SUCCESS,
    GET_ADMIN_LOGIN_DATA_REQUEST_FAIL,
    GET_ADMIN_LOGIN_DATA_REQUEST_ERROR,
} from '../Constants/AuthConstant';

const initialState = {
    token: '',
    errors: '',
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_LOGIN_DATA_REQUEST:
            return { ...state, loading: true };
        case GET_ADMIN_LOGIN_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                errors: '',
            };
        case GET_ADMIN_LOGIN_DATA_REQUEST_FAIL:
        case GET_ADMIN_LOGIN_DATA_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload?.message || 'An error occurred',
            };
        default:
            return state;
    }
};

export default authReducer;
