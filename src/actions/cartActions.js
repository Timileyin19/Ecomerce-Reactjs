
import Axios from 'axios';
// import {
//   CART_ADD_ITEM,
//   CART_REMOVE_ITEM,
//   CART_SAVE_SHIPPING_ADDRESS,
//   CART_SAVE_PAYMENT_METHOD,
//   CART_ADD_ITEM_FAIL,
// } from '../constants/cartConstants';
import { detailsProduct } from './productActions';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    let product = detailsProduct(productId);

  const { data } = await Axios.post(`https://v2.foodlocker.com.ng/apiv1/action=save_to_cart`, product, qty);
  // console.log(data);
};

// User must be authenticated
export const getUserCart = (userId) => async (dispatch) => {
    const { data } = await Axios.get(`https://v2.foodlocker.com.ng/apiv1?action=get_cart&user_id=${userId}`);
    // console.log(data);
    dispatch({ payload: data });
}

export const removeItemFromCart = (userId, cartId) => async () => {
    const { data } = await Axios.get(`https://v2.foodlocker.com.ng/apiv1?action=delete_cart&user_id=${userId}&id=${cartId}`);

    // console.log(data);
}

// export const removeFromCart = (productId, userId) => (dispatch, getState) => {
//   dispatch({ type: CART_REMOVE_ITEM, payload: productId });
//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
// };


