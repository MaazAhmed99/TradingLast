import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_ERROR,
	SET_PASSWORD_REQUEST,
	SET_PASSWORD_SUCCESS,
	SET_PASSWORD_ERROR,
	// GET_ME_SUCCESS,
	// LOGOUT_REQUEST,
	// LOGOUT_SUCCESS,
	// LOGOUT_ERROR,
	LOGOUT,
	USER_TOKEN,
	ALL_CATEGORIES,
	WISH_lIST,
	HOT_DEALS,
	EDIT_PROFILE,
	SOCIAL_MEDIA,
	COMPANYINFO,
	REMOVE_WISH,
	BRANDS,
	COUNTRY,
	ALL_BLOG,
	SINGLE_BLOG
	//   end
} from "../Types";
import {
	forgotPasswordApi,
	postSignIn,
	postSignUp,
	ResetPasswordApi,
} from "../../network/Network";
import { toast } from "react-toastify";
import { setError } from "../actions/AlertAction";
import { responses, responsesLogin } from "../../constant/ConstantFunction";

export const login =
	(data, cb = () => {}) =>
	(dispatch) =>
		new Promise(async (resolve, reject) => {
			dispatch({ type: LOGIN_REQUEST });
			postSignIn(data)
				.then((res) => {
					console.log(res);
					dispatch({
						type: LOGIN_SUCCESS,
						payload: res?.data?.data?.user,
					});
					dispatch({
						type: USER_TOKEN,
						payload: res?.data?.data?.token,
					});

					// dispatch(setError(responsesLogin(res)));

					return resolve(true);
				})
				.catch((err) => {
					console.log("Login", err.response);
					toast.error("Please Enter Correct Email or Password");
					// dispatch(setError(responses(err)));
					// toast.error(err?.response?.data?.payload?.message);
					dispatch({ type: LOGIN_ERROR });
					return reject(false);
				});
		});

export const signUp = (data, cb) => (dispatch) => {
	new Promise(async (resolve, reject) => {
		dispatch({ type: SIGNUP_REQUEST });
		postSignUp(data)
			.then((res) => {
				console.log(res);
				dispatch(setError(responses(res)));
				dispatch({ type: SIGNUP_SUCCESS, payload: res?.data?.data });
				// zaam added
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res?.data?.data?.user,
				});
				dispatch({
					type: USER_TOKEN,
					payload: res?.data?.data?.token,
				});
				// zaam added
				toast.success("Successfully Signup");
				dispatch(setError("success", "Successfully Signup!!!"));
				return resolve(true);
			})
			.catch((err) => {
				console.log("Error", err.response);
				// dispatch(setError(responses(err)));
				console.log(err?.response?.data?.errors[0]?.message);

				toast.error(err?.response?.data?.errors[0]?.message);
				return reject(false);
			})
			.finally(() => {
				dispatch({ type: SIGNUP_ERROR });
			});
	});
};

export const CategoriesData = (payload) => {
	return {
		type: ALL_CATEGORIES,
		payload,
	};
};

export const WishListData = (payload) => {
	return {
		type: WISH_lIST,
		payload,
	};
};

export const RemoveWishListData = (id) => {
	return {
		type: REMOVE_WISH,
		payload: id,
	};
};

export const HotDealsData = (payload) => {
	return {
		type: HOT_DEALS,
		payload,
	};
};

export const logout = (payload) => {
	return {
		type: LOGOUT,
		payload,
	};
};

export const EditProfileData = (payload) => {
	return {
		type: EDIT_PROFILE,
		payload,
	};
};

export const SocialMediaStore = (payload) => {
	return {
		type: SOCIAL_MEDIA,
		payload,
	};
};

export const CompanyInfoStore = (payload) => {
	return {
		type: COMPANYINFO,
		payload,
	};
};

export const BrandsFilterStore = (payload) => {
	return {
		type: BRANDS,
		payload,
	};
};

// export const Adsapi = (payload) => {
//   return {
//     type: ADS,
//     payload,
//   };
// };

export const Country = (payload) => {
	return {
		type: COUNTRY,
		payload,
	};
};

export const Blogs = (payload) => {
	return {
		type: ALL_BLOG,
		payload,
	};
};
export const singleBlog = (payload) => {
	return {
		type: SINGLE_BLOG,
		payload,
	};
};

export const forgotPassword = (data) => (dispatch) => {
	new Promise(async (resolve, reject) => {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });
		forgotPasswordApi(data)
			.then((res) => {
				dispatch(setError(responses(res)));
				dispatch({ type: FORGOT_PASSWORD_SUCCESS });
				console.log(res);
				toast.success(res?.data?.message);
				return resolve(true);
			})
			.catch((err) => {
				dispatch(setError(responses(err)));
				toast.error(err?.response?.data?.payload?.message);
				dispatch({ type: FORGOT_PASSWORD_ERROR });
				return reject(false);
			});
	});
};

export const SetResetPassword = (data, Navigate) => (dispatch) => {
	new Promise(async (resolve, reject) => {
		dispatch({ type: SET_PASSWORD_REQUEST });
		ResetPasswordApi(data)
			.then((res) => {
				toast.success("Your password has been reset");
				dispatch({ type: SET_PASSWORD_SUCCESS });
				Navigate("/Signin");
				return resolve(true);
			})
			.catch((err) => {
				toast.error(err?.response?.data?.payload?.message);
				dispatch({ type: SET_PASSWORD_ERROR });
				return reject(false);
			});
	});
};

//   end
