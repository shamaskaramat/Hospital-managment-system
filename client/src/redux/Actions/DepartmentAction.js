import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

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



const getAuthToken = () => {
    return Cookies.get('authToken');
};
// Fetch Departments
export const getDepartments = () => async (dispatch) => {
    try {
        dispatch({ type: GET_DEPARTMENTS_REQUEST });
        const token = getAuthToken();
        const response = await axios.get('http://localhost:8000/api/department/departments',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        // const response = await axios.get('http://localhost:8000/api/department/departments');

        dispatch({
            type: GET_DEPARTMENTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_DEPARTMENTS_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
        toast.error('Failed to fetch departments.');
    }
};

// Add Department
export const addDepartment = (departmentData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_DEPARTMENT_REQUEST });
        const token = getAuthToken();

        const response = await axios.post('http://localhost:8000/api/department/create', departmentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: ADD_DEPARTMENT_SUCCESS,
            payload: response.data
        });
        toast.success('Department added successfully.');
    } catch (error) {
        dispatch({
            type: ADD_DEPARTMENT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
        toast.error('Failed to add department.');
    }
};

// Update Department
export const updateDepartment = (id, departmentData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DEPARTMENT_REQUEST });
        const token = getAuthToken();

        const response = await axios.put(`http://localhost:8000/api/department/departments/${id}`, departmentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: UPDATE_DEPARTMENT_SUCCESS,
            payload: response.data
        });
        toast.success('Department updated successfully.');
    } catch (error) {
        dispatch({
            type: UPDATE_DEPARTMENT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
        toast.error('Failed to update department.');
    }
};

// Delete Department
export const deleteDepartment = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DEPARTMENT_REQUEST });
        const token = getAuthToken();

        await axios.delete(`http://localhost:8000/api/department/departments/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: DELETE_DEPARTMENT_SUCCESS,
            payload: id
        });
        toast.success('Department deleted successfully.');
    } catch (error) {
        dispatch({
            type: DELETE_DEPARTMENT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
        toast.error('Failed to delete department.');
    }
};
