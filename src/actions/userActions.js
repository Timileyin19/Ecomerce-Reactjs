import Axios from 'axios';
import {
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  // USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_LIST_REQUEST,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAIL,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAIL,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
  // USER_TOPSELLERS_LIST_REQUEST,
  // USER_TOPSELLERS_LIST_SUCCESS,
  // USER_TOPSELLERS_LIST_FAIL,
} from '../constants/userConstants';


export const register = (name, email, phone, country, password, password2) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, phone, country, password, password2 } });
  

//   {
//     "name" : "John Doe",
//     "email" : "doe@gmail.com",
//     "phone" : "08109383832",
//     "country" : "Nigeria",
//     "password" : "password",
//     "password2" : "password"
// }

  let user = {};
  user.name = name;
  user.email = email;
  user.phone = phone;
  user.country = country;
  user.password = password;
  user.password2 = password2;
  user.action = "register";
  user.issubmit = 1;
  try {
    const { data } = await Axios.post('https://v2.foodlocker.com.ng/apiv1', user);
    
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // my_signin(email, password);
      user.action = "login";
      
      const { signin_data } = await Axios.post('https://v2.foodlocker.com.ng/apiv1', user);
      console.log(signin_data);
    
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: signin_data.data });
    localStorage.setItem('userInfo', JSON.stringify(signin_data.data));
    
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const signin = (email, password) => async (dispatch) => {
  console.log("Signin Function");
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    let user = {};
    user.email = email;
    user.password = password;
    user.action = "login";
    user.issubmit = 1;
    const { data } = await Axios.post('https://v2.foodlocker.com.ng/apiv1', user);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
    document.location.href = '/';
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/signin';
};



