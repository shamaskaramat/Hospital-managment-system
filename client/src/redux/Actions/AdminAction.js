//auth main hain es k actions

import { GET_ALL_MESSAGES_FAILURE, GET_ALL_MESSAGES_REQUEST, GET_ALL_MESSAGES_SUCCESS } from "../Constants/AuthConstant";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const getAuthToken = () => {
    return Cookies.get('authToken');
};
export const fetchallMessages = () => async (dispatch) => {
    dispatch({ type: GET_ALL_MESSAGES_REQUEST });

    try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:8000/api/admin/messages', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: response.data.messages });
    } catch (error) {
        dispatch({ type: GET_ALL_MESSAGES_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error('Failed to fetch patient list');
    }
};