import React, { useEffect } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/css/st-style.css";
import "./assets/css/style.css";
import Popper from "popper.js";
import Home from "./views/pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./views/pages/Contact";
import Bookmark from "./views/pages/Bookmark";
import Deliveryinformation from "./views/pages/Deliveryinformation";
import Productspage from "../src/views/pages/Productspage";
import Gamingdeals from "./views/pages/Gamingdeals";
import Signin from "./views/pages/Signin";
import Signup from "./views/pages/Signup";
import Productdetail from "./views/pages/Productdetail";
import Productcart from "./views/pages/Productcart";
import Checkout from "./views/pages/Checkout";
import Traders from "./views/pages/Traders";
import Blog from "./views/pages/Blog";
// import Refundpolicy from "./views/pages/Policy Pages/Refundpolicy";
import Thankyou from "./views/pages/Thankyou";
import Alert from "./views/pages/Alert";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	GetAds,
	GetAllBrands,
	GetAllCategories,
	GetCountryApi,
	GetHotDeals,
	GetWishList,
	ProductDetails,
	TopProducts,
	SingleBlog
} from "./network/Network";
import {
	BrandsFilterStore,
	CategoriesData,
	Country,
	HotDealsData,
	WishListData,
} from "./redux/actions/AuthActions";
import "./assets/css/Custom.css";
import AllProducts from "./views/pages/Products/AllProducts";
import Profile from "./views/pages/Profile/Profile";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import MyOrders from "./views/pages/Profile/MyOrders";
import Faqs from "./views/pages/FAQs/Faqs";
import ForgotEmail from "./views/pages/ForgotEmail";
import ForgotPassword from "./views/pages/ForgotPassword";
import { Adsapi, TopProductsApi } from "./redux/actions/CartActions";
import Hotdeals from "./views/pages/Hotdeals";
import { BLOGDETAIL } from "./network/Endpoint";
import BlogDetail from "./views/pages/Blog/BlogDetail";
import Refundpolicy from "./views/pages/Policy Pages/Refundpolicy";
import PrivacyPolicy from "./views/pages/Policy Pages/PrivacyPolicy";
import CookiePolicy from "./views/pages/Policy Pages/CookiePolicy";
import TermsCondition from "./views/pages/Policy Pages/Terms";

function App() {
	const dispatch = useDispatch();
	const Token = useSelector((state) => state.AuthReducer.token);

	// Get All Categories
	useEffect(() => {
		GetAllCategories()
			.then((res) => {
				console.log(res);
				dispatch(CategoriesData(res?.data?.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get WishList
	useEffect(() => {
		GetWishList(Token)
			.then((res) => {
				console.log(res);
				dispatch(WishListData(res?.data?.data?.wishlist));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get Hot Deals
	useEffect(() => {
		GetHotDeals()
			.then((res) => {
				console.log(res);
				dispatch(HotDealsData(res?.data?.data?.products?.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get All Brands
	useEffect(() => {
		GetAllBrands()
			.then((res) => {
				console.log("brands", res);
				dispatch(BrandsFilterStore(res?.data?.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get ads
	useEffect(() => {
		GetAds()
			.then((res) => {
				console.log(res);
				// setAdsData(res?.data?.data?.ads);
				dispatch(Adsapi(res?.data?.data?.ads));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get Country Api
	useEffect(() => {
		GetCountryApi()
			.then((res) => {
				console.log("country", res);
				dispatch(Country(res?.data?.data?.country));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	useEffect(() => {
		TopProducts()
			.then((res) => {
				console.log("top", res);
				dispatch(TopProductsApi(res?.data?.data?.topproducts));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Contact" element={<Contact />} />
					{/* <Route exact path="/Bookmark" element={<Bookmark />} /> */}
					<Route path="/Hotdeals" element={<Hotdeals />} />
					<Route path="/Delivery" element={<Deliveryinformation />} />
					<Route exact path="/Productspage/:Id" element={<Productspage />} />
					{/* <Route exact path="/Gaming-deals" element={<Gamingdeals />} /> */}
					<Route exact path="/Product-detail/:Id" element={<Productdetail />} />
					<Route path="Product-cart" element={<Productcart />} />
					<Route exact path="/Checkout" element={<Checkout />} />
					<Route exact path="/traders" element={<Traders />} />
					<Route exact path="/refundpolicy" element={<Refundpolicy />} />
					<Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
					<Route exact path="/cookiepolicy" element={<CookiePolicy />} />
					<Route exact path="/termsandcondition" element={<TermsCondition />} />
					<Route exact path="/thankyou" element={<Thankyou />} />
					<Route exact path="Signin" element={<Signin />} />
					<Route exact path="Signup" element={<Signup />} />
					<Route exact path="faqs" element={<Faqs />} />
					<Route exact path="/allproducts" element={<AllProducts />} />
					<Route exact path="/blog" element={<Blog />} />
					<Route exact path="/blog/:id" element={<BlogDetail />} />
					<Route path="auth" element={<ProtectedRoutes />}>
						<Route path="profile" element={<Profile />} />
						<Route path="bookmark" element={<Bookmark />} />
						<Route path="myorders" element={<MyOrders />} />
					</Route>
					<Route path="forgotpassword" element={<ForgotEmail />} />
					<Route path="newpassword" element={<ForgotPassword />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
			{/* <Alert /> */}
		</>
	);
}

export default App;
