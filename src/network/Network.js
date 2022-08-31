import {
	AUTH,
	LOGIN,
	SIGNUP,
	CATEGORIES,
	CUSTOMER,
	WISHLIST,
	PRODUCTS,
	HOTDEALS,
	RELATED_PRODUCTS,
	TRADING,
	REVIEWS,
	LATEST,
	ORDER,
	LIST,
	CONTACTUS,
	NEWSLETTER,
	ADD,
	FAQ,
	PLACE,
	TRACK,
	REMOVE_ALL,
	CUSTOMER_ID,
	UPDATE_PROFILE,
	SOCIAL_MEDIA,
	LINKS,
	COMPANY_INFORMATION,
	COUPON,
	APPLY,
	CODE,
	REMOVE,
	PRODUCT_ID,
	SEARCH,
	NAME,
	SUBMIT,
	BRANDS,
	PAGE,
	PRICE,
	START,
	END,
	BANNERS,
	BANNER_TYPE,
	STATUS,
	ADS,
	BLOGS,
	FORGOT_PASSWORD,
	COUNTRY,
	RESET_PASSWORD,
	CHANGE_PASSWORD,
	TOP_PRODUCTS,
	GET_PAGE,
	TYPE,
	DETAILS,
	BLOGDETAIL
	// end
	// FROGOT_PASSWORD,
} from "../network/Endpoint";

import {
	doGet,
	doPost,
	doPatch,
	doDelete,
	doPostProfilePictureUpload,
} from "./Config";

export const postSignIn = (data) => {
	return doPost(`${AUTH}${LOGIN}`, { ...data });
};

export const postSignUp = (data) => {
	return doPost(`${AUTH}${SIGNUP}`, data);
};

export const GetAllCategories = () => {
	return doGet(`${CATEGORIES}`);
};

export const GetWishList = (currentPage, token) => {
	return doGet(`${CUSTOMER}${WISHLIST}${PAGE}=${currentPage}`, token);
};


// export const GetHotDeals = (currentPage, data) => {
// 	return doGet(
// 		`${PRODUCTS}${HOTDEALS}${STATUS}=${data}${`&`}${`page`}${`&`}${`page`}=${currentPage}`,
// 	);
// };

// zaam work starts

export const GetHotDeals = (currentPage,data) => {
	return doGet(
		`${PRODUCTS}${HOTDEALS}${STATUS}=${data?.highToLow ? data?.highToLow : ""}${`&`}${`subcategory_id`}=${data?.category_id ? data?.category_id : ""}${`&`}${`price_start`}=${data?.price_start ? data?.price_start : ""}${`&`}${`price_end`}=${data?.price_start ? data?.price_end : ""}${`&`}${`brand_id`}=${data?.brand_id ? data?.brand_id : ""}${`&`}${`page`}=${currentPage}`,
	);
};

export const GetAllProducts = (currentPage, data) => {
	return doGet(
		`${PRODUCTS}${LATEST}${STATUS}=${data?.highToLow ? data?.highToLow : ""}${`&`}${`subcategory_id`}=${data?.category_id ? data?.category_id : ""}${`&`}${`price_start`}=${data?.price_start ? data?.price_start : ""}${`&`}${`price_end`}=${data?.price_start ? data?.price_end : ""}${`&`}${`brand_id`}=${data?.brand_id ? data?.brand_id : ""}${`&`}${`page`}=${currentPage}`,
	);
};

export const GetProductsFilter = (currentPage, id, data) => {
	return doGet(
		`${CATEGORIES}${PRODUCTS}/${id}${STATUS}=${data?.highToLow ? data?.highToLow : ""}${`&`}${`subcategory_id`}=${data?.category_id ? data?.category_id : ""}${`&`}${`price_start`}=${data?.price_start ? data?.price_start : ""}${`&`}${`price_end`}=${data?.price_start ? data?.price_end : ""}${`&`}${`brand_id`}=${data?.brand_id ? data?.brand_id : ""}${`&`}${`page`}=${currentPage}`,
	);
};

// zaam work ends

export const GetSimilarProducts = (id) => {
	return doGet(`${PRODUCTS}${RELATED_PRODUCTS}/${id}`);
};

export const GetTradingProducts = (currentPage) => {
	return doGet(`${PRODUCTS}${TRADING}${PAGE}=${currentPage}`);
};



export const SelectedProductReviews = (id, currentPage) => {
	return doGet(`${PRODUCTS}${REVIEWS}/${id}${PAGE}=${currentPage}`);
};

export const GetHotProductFilter = (currentPage, data, id) => {
	return doGet(
		`${CATEGORIES}${PRODUCTS}${HOTDEALS}/${id}${STATUS}=${data}${`&`}${`page`}=${currentPage}`,
	);
};

// /products/latest?status=high_to_low&category_id=45&subcategory_id=&price_start=&price_end=&brand_id=
// `${PRODUCTS}${LATEST}?${STATUS}=${data?.status}${`&`}{"category_id"}=${data?.id}${`&`}{"subcategory_id"}=${data?.subId}${`&`}{"price_start"}=${data?.price_start}${`&`}{"price_end"}=${data?.price_end}${`&`}{"brand_id"}=${data.brand_id}${`&`}${`page`}=${currentPage}`

export const GetAllOrders = (currentPage, token) => {
	return doGet(`${CUSTOMER}${ORDER}${LIST}${PAGE}=${currentPage}`, token);
};

export const PostContactUs = (data, token) => {
	return doPost(`${CONTACTUS}`, data, token);
};

export const PostNewsLetter = (data) => {
	return doPost(`${NEWSLETTER}`, data);
};

export const AddWishList = (data, token) => {
	return doPost(`${CUSTOMER}${WISHLIST}${ADD}`, data, token);
};

export const GetFaqs = () => {
	return doGet(`${FAQ}`);
};

export const PlaceOrder = (data, token) => {
	return doPost(`${CUSTOMER}${ORDER}${PLACE}`, data, token);
};

export const OrderTracking = (id, token) => {
	return doGet(`${TRACK}/${id}`, token);
};

export const ClearWishList = (id, token) => {
	return doDelete(
		`${CUSTOMER}${WISHLIST}${REMOVE_ALL}${CUSTOMER_ID}=${id}`,
		token,
	);
};

export const UpdateProfile = (data, token) => {
	return doPostProfilePictureUpload(
		`${CUSTOMER}${UPDATE_PROFILE}`,
		data,
		token,
	);
};

export const SocialLinks = () => {
	return doGet(`${SOCIAL_MEDIA}${LINKS}`);
};

export const CompanyInfo = () => {
	return doGet(`${COMPANY_INFORMATION}`);
};

export const ApplyCoupons = (data) => {
	return doGet(`${COUPON}${APPLY}${CODE}=${data}`);
};

export const DeleteWishList = (id, token) => {
	return doDelete(`${CUSTOMER}${WISHLIST}${REMOVE}${PRODUCT_ID}=${id}`, token);
};

export const SearchProducts = (data) => {
	return doGet(`${PRODUCTS}${SEARCH}${NAME}=${data}`);
};

export const PostProductRating = (data, token) => {
	return doPost(`${PRODUCTS}${REVIEWS}${SUBMIT}`, data, token);
};



export const GetAllBrands = () => {
	return doGet(`${BRANDS}`);
};

export const GetFilterBrands = (currentPage, id) => {
	return doGet(`${BRANDS}${PRODUCTS}/${id}${PAGE}=${currentPage}`);
};

export const PostPriceFilter = (currentPage, data) => {
	return doGet(
		`${PRODUCTS}${SEARCH}${PRICE}${START}=${data?.start}&${END}=${data?.end
		}${`&category`}=${data?.id}`,
	);
};

export const GetHomeBanner = (data) => {
	return doGet(`${BANNERS}${BANNER_TYPE}=${data?.type}`);
};

export const GetAds = () => {
	return doGet(`${ADS}`);
};

export const GetNews = (currentPage) => {
	return doGet(`${BLOGS}${PAGE}=${currentPage}`);
};

export const SingleBlog = (id) => {
	return doGet(`${BLOGDETAIL}/${id}`);
};

export const forgotPasswordApi = (data) => {
	return doPost(`${AUTH}${FORGOT_PASSWORD}`, data);
};

export const ResetPasswordApi = (data) => {
	return doPost(`${AUTH}${RESET_PASSWORD}`, data);
};

export const GetCountryApi = () => {
	return doGet(`${COUNTRY}`);
};

export const PostChangePassword = (data, token) => {
	return doPost(`${CUSTOMER}${CHANGE_PASSWORD}`, data, token);
};

export const TopProducts = () => {
	return doGet(`${TOP_PRODUCTS}`);
};

export const PageData = (data) => {
	return doGet(`${GET_PAGE}${TYPE}=${data}`);
};

export const ProductDetails = (data) => {
	return doGet(`${PRODUCTS}${DETAILS}/${data}`);
};

// END

// ---END --
