import {
    GET_DEPARTMENTS_REQUEST,
    GET_DEPARTMENTS_SUCCESS,
    GET_DEPARTMENTS_FAIL,
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAIL,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAIL
} from '../Constants/DepartmentConstant';

const initialState = {
    loading: false,
    departments: [],
    error: null
};

export const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENTS_REQUEST:
        case ADD_DEPARTMENT_REQUEST:
        case UPDATE_DEPARTMENT_REQUEST:
        case DELETE_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_DEPARTMENTS_SUCCESS:
            return { ...state, loading: false, departments: action.payload };

        case ADD_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, departments: [...state.departments, action.payload] };

        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: state.departments.map(dept =>
                    dept._id === action.payload._id ? action.payload : dept
                )
            };

        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: state.departments.filter(dept => dept._id !== action.payload)
            };

        case GET_DEPARTMENTS_FAIL:
        case ADD_DEPARTMENT_FAIL:
        case UPDATE_DEPARTMENT_FAIL:
        case DELETE_DEPARTMENT_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
