import { ALERTS, SET_ALERTS } from "../Types";
import {
  forgotPasswordApi,
  postSignIn,
  postSignUp,
  setNewPasswordApi,
  forgotPasswordEmailApi,
  PostChats,
  // logoutApi,
} from "../../network/Network";
import { toast } from "react-toastify";

export const makeAlert = (obj) => {
  return {
    type: ALERTS,
    payload: obj,
  };
};

export const resetAlerts = () => {
  return {
    type: SET_ALERTS,
    payload: null,
  };
};

export const setError = (arr) => {
  return (dispatch) => {
    console.log("404 Erropr",arr);
    if(arr.message == 'Request failed with status code 404' ){
      toast.error("Please Enter Correct Email");
    }
    dispatch(makeAlert(arr.message == 'Request failed with status code 404' ? "Please Enter Correct Email" : arr));
    setTimeout(() => {
      dispatch(resetAlerts());
    }, 50000);
  };
};
