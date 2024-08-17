// src/actions/authActions.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {
  GET_ADMIN_LOGIN_DATA_REQUEST,
  GET_ADMIN_LOGIN_DATA_REQUEST_SUCCESS,
  GET_ADMIN_LOGIN_DATA_REQUEST_FAIL,
  GET_ADMIN_LOGIN_DATA_REQUEST_ERROR,
} from '../Constants/AuthConstant';

export const loginAdmin = (AdminLogin, navigate) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_LOGIN_DATA_REQUEST });

    const response = await axios.post('http://localhost:8000/api/admin/login', AdminLogin);

    if (response.data.success) {
      const { token } = response.data;
      toast.success('Login successful!');
      Cookies.set('authToken', token); // Store token in cookies
      dispatch({
        type: GET_ADMIN_LOGIN_DATA_REQUEST_SUCCESS,
        payload: response.data,
      });
      navigate('/admin');
    } else {
      dispatch({ type: GET_ADMIN_LOGIN_DATA_REQUEST_FAIL });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: GET_ADMIN_LOGIN_DATA_REQUEST_ERROR });
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};
