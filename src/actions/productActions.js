import Axios from 'axios';
import {
    // PRODUCT_CREATE_FAIL,
    // PRODUCT_CREATE_REQUEST,
    // PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    // PRODUCT_UPDATE_REQUEST,
    // PRODUCT_UPDATE_SUCCESS,
    // PRODUCT_UPDATE_FAIL,
    // PRODUCT_DELETE_REQUEST,
    // PRODUCT_DELETE_FAIL,
    // PRODUCT_DELETE_SUCCESS,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_FAIL,
    // PRODUCT_REVIEW_CREATE_REQUEST,
    // PRODUCT_REVIEW_CREATE_SUCCESS,
    // PRODUCT_REVIEW_CREATE_FAIL,
  } from '../constants/productConstants';

  export const listProducts = ({
    // pageNumber = '',
    // name = '',
    // category = '',
    // order = '',
    // min = 0,
    // max = 0,
  }) => async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
          `https://v2.foodlocker.com.ng/apiv1?action=all_products&sort='name'`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      // console.log(data);
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };


export const listProductCategories = () => async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(`https://v2.foodlocker.com.ng/apiv1?action=all_category`, {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Content-Type' : 'application/json;charset=utf-8'
            },
            responseType: 'json',
        });
      // console.log(data);
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
    }
  };


  export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
      const { data } = await Axios.get(`https://v2.foodlocker.com.ng/apiv1?action=view&id=${productId}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
      // console.log(data)
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };