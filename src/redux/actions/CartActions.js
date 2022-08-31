import {
  ADD_TO_CART,
  CART_CLEAR,
  DELETE_CART_ITEM,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  PRODUCT_REVIEWS,
  ADS,
  TOP_PRODUCTS,
} from "../Types";
import {
  forgotPasswordOtp,
  forgotPasswordApi,
  postSignIn,
  postSignUp,
  setNewPasswordApi,
  forgotPasswordEmailApi,
  PostChats,
} from "../../network/Network";
import { toast } from "react-toastify";
import { setError } from "../actions/AlertAction";
import { responses, responsesLogin } from "../../constant/ConstantFunction";

export const AddToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const ClearCart = (payload) => {
  return {
    type: CART_CLEAR,
    payload,
  };
};

export const deleteCartItem = (currentItem) => (dispatch) => {
  dispatch({
    type: DELETE_CART_ITEM,
    payload: currentItem,
  });
};

export const IncrementProductQuantity = (id) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: id,
  };
};

export const DecrementProductQuantity = (id) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: id,
  };
};

export const ProductAllReviews = (payload) => {
  return {
    type: PRODUCT_REVIEWS,
    payload,
  };
};

export const Adsapi = (payload) => {
  return {
    type: ADS,
    payload,
  };
};

export const TopProductsApi = (payload) => {
  return {
    type: TOP_PRODUCTS,
    payload,
  };
};
