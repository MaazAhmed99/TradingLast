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
	// SET_PROFILE_IMG,
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
	BRANDS,
	COUNTRY,
	ALL_BLOG,
	REMOVE_WISH,
	SINGLE_BLOG
	//   end
} from "../Types";

const initialState = {
	isLogin: false,
	isSignup: false,
	loading: false,
	// forgotLoading: false,
	// setPasswordLoading: false,
	users: {},
	token: "",
	categoriesData: [],
	wishlistData: [],
	hotDeals: [],
	socialMedia: [],
	companyInfo: [],
	//   end
	country: [],
	blogs: [],
	Singleblog: [],
};
const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST: {
			return Object.assign({}, state, {
				loading: true,
			});
		}
		case LOGIN_SUCCESS: {
			return Object.assign({}, state, {
				users: action.payload,
				loading: false,
				isLogin: true,
			});
		}
		case LOGIN_ERROR: {
			return Object.assign({}, state, {
				loading: false,
				isLogin: false,
			});
		}
		case USER_TOKEN: {
			return Object.assign({}, state, {
				token: action.payload,
			});
		}
		case SIGNUP_REQUEST: {
			return Object.assign({}, state, {
				loading: true,
			});
		}
		case SIGNUP_SUCCESS: {
			return Object.assign({}, state, {
				users: action.data,
				isSignup: true,
				loading: false,
			});
		}
		case SIGNUP_ERROR: {
			return Object.assign({}, state, {
				loading: false,
				isLogin: false,
			});
		}
		case FORGOT_PASSWORD_REQUEST: {
			return Object.assign({}, state, {
				forgotLoading: true,
				isSuccess: false,
			});
		}
		case FORGOT_PASSWORD_SUCCESS: {
			return Object.assign({}, state, {
				forgotLoading: false,
				isSuccess: true,
			});
		}
		case FORGOT_PASSWORD_ERROR: {
			return Object.assign({}, state, {
				forgotLoading: false,
				isSuccess: false,
			});
		}
		case SET_PASSWORD_REQUEST: {
			return Object.assign({}, state, {
				setPasswordLoading: true,
			});
		}
		case SET_PASSWORD_SUCCESS: {
			return Object.assign({}, state, {
				setPasswordLoading: false,
			});
		}
		case SET_PASSWORD_ERROR: {
			return Object.assign({}, state, {
				setPasswordLoading: false,
			});
		}
		case LOGOUT:
			return {
				users: null,
				isLogin: false,
			};

		case ALL_CATEGORIES: {
			return Object.assign({}, state, {
				...state,
				categoriesData: action.payload,
			});
		}
		case WISH_lIST: {
			return Object.assign({}, state, {
				...state,
				wishlistData: action.payload,
			});
		}

		case REMOVE_WISH: {
			return {
				...state,
				wishlistData: state.wishlistData.filter(
					(val) => val.product.id !== action.payload,
				),
			};
		}

		case HOT_DEALS: {
			return Object.assign({}, state, {
				...state,
				hotDeals: action.payload,
			});
		}

		case EDIT_PROFILE: {
			return Object.assign({}, state, {
				...state,
				users: action.payload,
			});
		}
		case SOCIAL_MEDIA: {
			return Object.assign({}, state, {
				...state,
				socialMedia: action.payload,
			});
		}

		case COMPANYINFO: {
			return Object.assign({}, state, {
				...state,
				companyInfo: action.payload,
			});
		}

		case COUNTRY: {
			return Object.assign({}, state, {
				...state,
				country: action.payload,
			});
		}

		case ALL_BLOG: {
			return Object.assign({}, state, {
				...state,
				blogs: action.payload,
			});
		}
		case SINGLE_BLOG: {
			return Object.assign({}, state, {
				...state,
				Singleblog: action.payload.blog[0],
			});
		}
		case BRANDS: {
			return Object.assign({}, state, {
				...state,
				brands: action.payload,
			});
		}

		// end

		default:
			return state;
	}
};
export default AuthReducer;
