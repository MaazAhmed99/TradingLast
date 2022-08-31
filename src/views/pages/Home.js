import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import bannerslide1 from "../../assets/img/banner-1.jpg";
import jiggle1 from "../../assets/img/img-left-1.png";
import jiggle2 from "../../assets/img/img-left.png";
import { Link } from "react-router-dom";

import Cards from "../components/Cards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Products from "../components/Products";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import {
	GetAllProducts,
	GetHomeBanner,
	GetProductsFilter,
	SearchProducts,
} from "../../network/Network";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";

const Home = (props) => {
	const HotDeals = useSelector((state) => state.AuthReducer.hotDeals);
	const AdsData = useSelector((state) => state.CartReducer.ads);
	const TopProductsRedux = useSelector(
		(state) => state.CartReducer.topProducts,
	);
	const [checked, setChecked] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [spinLoad, setSpinLoad] = useState(false);
	const [productsData, setProductsData] = useState([]);
	const [bannerData, setBannerData] = useState([]);
	const [loader, setLoader] = useState(true);

	const [searchSpinLoad, setSearchSpinLoad] = useState(false);
	const [searchData, setSearchData] = useState([]);
	const [productsSearch, setProductsSearch] = useState("");
	const [productImages, setProductImages] = useState([]);

	const handleSelectCategory = (id) => {
		setChecked(id);
	};

	console.log("test1", checked);

	const BannerSlider = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const regularSlider = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
	};

	// useEffect(() => {
	// 	setSpinLoad(true);
	// 	GetAllProducts()
	// 		.then((res) => {
	// 			console.log(res);
	// 			setProductsData(res?.data?.data?.data);
	// setProductImages(res?.data?.data?.products?.data);
	// 			setSpinLoad(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setSpinLoad(false);
	// 		});
	// }, []);


	useEffect(() => {
		let data = {}
		GetAllProducts(data, currentPage)
			.then((res) => {
				setProductsData(res?.data?.data?.data);
				setProductImages(res?.data?.data?.products?.data);
			})
			.catch((err) => {
				console.log(err)
			})
	}, [currentPage]);

	useEffect(() => {
		GetProductsFilter(checked)
			.then((res) => {
				console.log(res);
				// setProductsData(res?.data?.data);
				// dispatch(HotDealsData(res?.data?.data?.products?.data));
				// let cateData = JSON.parse(productsData?.category_ids);
				// const total = res?.data?.response?.data?.total;
				// setPageCount(Math.ceil(total / limit));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [checked, currentPage]);

	useEffect(() => {
		let data = {
			type: "all",
		};
		GetHomeBanner(data)
			.then((res) => {
				console.log("banner", res);
				let arr = [];
				for (let i = 0; i < res?.data.length; i++) {
					if (res?.data?.[i].banner_type === "Main Banner")
						arr.push(res?.data?.[i]);
				}
				setBannerData(arr);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const SubmitSearch = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setSearchSpinLoad(true);
			if (!productsSearch) {
				toast.error("Please enter Product Name");
				setSearchSpinLoad(false);
				return;
			}
			SearchProducts(productsSearch)
				.then((res) => {
					console.log(res);
					setSearchData(res?.data?.data?.products?.data);
					setSearchSpinLoad(false);
				})
				.catch((err) => {
					console.log(err?.response?.data);
					toast.error(err?.response?.data?.message);
					setSearchSpinLoad(false);
				});
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2000);
	}, []);

	console.log(productsData);
	return (
		<>
			{!loader ? (
				<>
					<Header setChecked={setChecked} />

					<img src={jiggle2} className="img-tls" alt="" />

					<section className="Home-banner">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-sm-12 col-12">
									<div className="home-banner fullwidth">
										<Slider {...BannerSlider}>
											{bannerData?.map((item, index) => {
												return (
													<>
														{item?.banner_type === "Main Banner" ? (
															<li className="slide" key={index}>
																<Link to="">
																	<div className="container">
																		<div className="slide__text row">
																			<div className="col-md-10">
																				<div className="d-flex pb-2">
																					<h5 className="sub-heading pr-3 fw-500 pt-3 font-30 text-white">
																						{item?.title}{" "}
																					</h5>
																				</div>
																				<h3 className="fw-600 font-60 subtitle text-blue">
																					{item?.sub_title}
																				</h3>

																				<p className="text-white">
																					{item?.description}
																				</p>

																				<div className="searchBox">
																					<input
																						type="text"
																						placeholder="Search Product"
																						value={productsSearch}
																						onChange={(e) =>
																							setProductsSearch(e.target.value)
																						}
																						onKeyDown={SubmitSearch}
																					/>
																					<button
																						onClick={(e) => SubmitSearch(e)}
																					>
																						<i
																							className="fa fa-search"
																							aria-hidden="true"
																						></i>
																					</button>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="slide__image">
																		<img
																			src={`${item?.banner_image_url}`}
																			alt=""
																			className="image-fluid"
																		/>
																	</div>
																</Link>
															</li>
														) : null}
													</>
												);
											})}
										</Slider>
									</div>
								</div>
								<div className="col-md-3 ">
									{HotDeals?.map((item, index) =>
										index === 0 ? <Products item={item} index={index} /> : null,
									)}
								</div>
							</div>
						</div>
					</section>

					<div className="container ">
						{searchSpinLoad ? (
							<>
								<div className="loader-container">
									<SpinnerCircular size="80px" color="#8dc63e" />
								</div>
							</>
						) : (
							<div className="row mb-5">
								{searchData?.map((item, index) => (
									<div className="col-lg-3 col-md-6 pt-2 ">
										<Products item={item} index={index} />
									</div>
								))}
							</div>
						)}

						<div className="row pb-4">
							<div className="col-md-6">
								<h5 className="sub-heading fw-500 font-20">
									20% Off Just for Traders
								</h5>
							</div>
						</div>
						<div className="regular">
							<Slider {...regularSlider}>
								{TopProductsRedux?.map((item, index) => {
									return <Cards item={item} index={index} />;
								})}
							</Slider>
						</div>
					</div>

					<section>
						<div className="container ">
							<div className="row pb-3">
								<div className="col-md-6 col-sm-6 col-6 ">
									<h2 className="font-26 fw-500 text-green bestDeals-font">
										Flat 20 % off
									</h2>
								</div>
								<div className="col-md-6 col-sm-6 col-6  text-right">
									<Link to="/Hotdeals" className="btn-underline">
										View All
									</Link>
								</div>
							</div>
							<div className="row">
								{HotDeals?.map((item, index) =>
									HotDeals.length <= 3 ? (
										<div className="col-md-3 pt-2 my-4">
											<Products item={item} index={index} />
										</div>
									) : null,
								)}
							</div>
						</div>
					</section>

					<div className="container">
						<div className="row justify-content-center align-middle align-items-center">
							{AdsData?.length >= 2 ? (
								<div className="col-md-6 pt-2 no-pad-right">
									<div 
										onClick={() => { window.open(`${AdsData[2]?.url ? AdsData[2]?.url : null}`) }}
										className="box cursor_pointer" >
										<img
											src={AdsData[2]?.image_url ? AdsData[2]?.image_url : null}
											className="img-fluid"
											alt=""
										/>
										<div className="bottom-left">
											<p
												to={`${AdsData[2]?.url ? AdsData[2]?.url : null}`}
												className="btnbl text-white font-12"
												tabIndex="-1"
											>
												{AdsData[2]?.button_name
													? AdsData[2]?.button_name
													: AdsData[2]?.button_name}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 30 30"
												>
													<g
														id="Group_4119"
														data-name="Group 4119"
														transform="translate(-336 -1971)"
													>
														<g
															id="Group_47"
															data-name="Group 47"
															transform="translate(-5 2)"
														>
															<g
																id="Ellipse_5"
																data-name="Ellipse 5"
																transform="translate(341 1969)"
																fill="none"
																stroke="#fff"
																strokeWidth="1"
															>
																<circle cx="15" cy="15" r="15" stroke="none" />
																<circle cx="15" cy="15" r="14.5" fill="none" />
															</g>
															<path
																id="Icon_awesome-arrow-right"
																data-name="Icon awesome-arrow-right"
																d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
																transform="translate(358.94 1977.355)"
																fill="#fff"
															/>
														</g>
													</g>
												</svg>
											</p>
										</div>

										<div className="m-centered">
											<p className="text-white line-height-1">
												{AdsData[2]?.title ? AdsData[2]?.title : null}
											</p>
											<h2 className="text-white line-height-1 font-20">
												{AdsData[2]?.sub_title ? AdsData[2]?.sub_title : null}
											</h2>
										</div>
									</div>
								</div>
							) : null}
							{AdsData?.length >= 3 ? (
								<div className="col-md-6 pt-2 no-pad-left">
									<div
										onClick={() => { window.open(`${AdsData[3]?.url ? AdsData[3]?.url : null}`) }}
										className="box cursor_pointer">
										<img
											src={AdsData[3]?.image_url}
											alt=""
											className="img-fluid"
										/>
										<div className="bottom-left">
											<p

												className="btnbl text-black font-12"
												tabIndex="-1"
											>
												{AdsData[3]?.button_name}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 30 30"
												>
													<g
														id="Group_47"
														data-name="Group 47"
														transform="translate(-341 -1969)"
													>
														<g
															id="Ellipse_5"
															data-name="Ellipse 5"
															transform="translate(341 1969)"
															fill="none"
															stroke="#000"
															strokeWidth="1"
														>
															<circle cx="15" cy="15" r="15" stroke="none" />
															<circle cx="15" cy="15" r="14.5" fill="none" />
														</g>
														<path
															id="Icon_awesome-arrow-right"
															data-name="Icon awesome-arrow-right"
															d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
															transform="translate(358.94 1977.355)"
														/>
													</g>
												</svg>
											</p>
										</div>
										<div className="m-centered">
											<p className="line-height-1"> {AdsData[3]?.title} </p>
											<h2 className="line-height-1 font-20">
												{" "}
												{AdsData[3]?.sub_title}{" "}
											</h2>
										</div>
									</div>
								</div>
							) : null}
						</div>
					</div>

					{AdsData?.length >= 4 ? (
						<div

							className="container Traders mt-3"
							style={{
								backgroundImage: `url('${AdsData[4]?.image_url ? AdsData[4]?.image_url : null
									}')`,
							}}
						>
							<div className="row">
								<div className="col-md-12">
									<div className="pl-4">
										<div className="cursor_pointer" onClick={() => { window.open(`${AdsData[4]?.url ? AdsData[4]?.url : null}`) }}>
											<p className="font-20">Get Different Price On</p>
											<h2>{AdsData[4]?.title ? AdsData[4]?.title : null}</h2>
											<p className="font-20">
												{AdsData[4]?.sub_title ? AdsData[4]?.sub_title : null}
											</p>
											<div className="pt-5">
												<p

													// to={`${AdsData[4]?.url ? AdsData[4]?.url : null}`}
													// target="_blank" rel="noopener noreferrer"
													className="btn btnbl text-black font-12"
													tabIndex="-1"
												>
													{AdsData[4]?.button_name
														? AdsData[4]?.button_name
														: null}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 30 30"
													>
														<g
															id="Group_47"
															data-name="Group 47"
															transform="translate(-341 -1969)"
														>
															<g
																id="Ellipse_5"
																data-name="Ellipse 5"
																transform="translate(341 1969)"
																fill="none"
																stroke="#000"
																strokeWidth="1"
															>
																<circle
																	cx="15"
																	cy="15"
																	r="15"
																	stroke="none"
																></circle>
																<circle
																	cx="15"
																	cy="15"
																	r="14.5"
																	fill="none"
																></circle>
															</g>
															<path
																id="Icon_awesome-arrow-right"
																data-name="Icon awesome-arrow-right"
																d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
																transform="translate(358.94 1977.355)"
															></path>
														</g>
													</svg>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}

					<section>
						<div className="container ">
							<img src={jiggle1} alt="" className="img-left-1 pt-5" />
							<div className="row pb-3">
								<div className="col-md-6 col-sm-6 col-6">
									<h2 className="font-26 fw-500 text-green bestDeals-font">
										Best Deals Products
									</h2>
								</div>
								<div className="col-md-6 col-sm-6 col-6 text-right">
									<Link to="/allproducts" className="btn-underline">
										View All
									</Link>
								</div>
							</div>
							<div className="row">
								{productsData?.map((item, index) => {
									return (
										<>
											{index < 8 ? (
												<>
													<div className="col-md-3 pt-2 my-4">
														<Products item={item} index={index} />
													</div>
												</>
											) : null}
										</>
									);
								})}
							</div>
						</div>
					</section>

					<section className="cover-banner fridge-banner">
						<div className="container">
							<div className="row pt-5">
								<div className="col-md-8 pl-5 pt-5">
									<p className="line-height-1">Lorem ipsum dolor </p>
									<h2 className="font-40 fw-500">Best Deals Products</h2>

									<p className="pt-3">
										<span className="">
											<i className="fa fa-check-circle"></i> Lorem ipsum dolor{" "}
										</span>
										<span className="pl-4">
											<i className="fa fa-check-circle"></i> Lorem ipsum dolor{" "}
										</span>
										<span className="pl-4">
											<i className="fa fa-check-circle"></i> Lorem ipsum dolor{" "}
										</span>
									</p>
									<p className="pt-3">
										<span>
											<i className="fa fa-check-circle"></i> Lorem ipsum dolor{" "}
										</span>
										<span className="pl-4">
											<i className="fa fa-check-circle"></i> Lorem ipsum dolor{" "}
										</span>
									</p>
								</div>
								<div className="col-md-4"></div>
							</div>
						</div>
					</section>

					<section>
						<div className="container ">
							<div className="row pb-3">
								<div className="col-md-6 col-sm-6 col-6 ">
									<h2 className="font-26 fw-500 text-green bestDeals-font">
										Hottest Deals Nearby
									</h2>
								</div>
								<div className="col-md-6 col-sm-6 col-6 text-right">
									<Link to="/Hotdeals" className="btn-underline">
										View All
									</Link>
								</div>
							</div>
							<div className="row">
								{HotDeals?.map((item, index) => (
									<div className="col-md-3 pt-2 my-4">
										<Products item={item} index={index} />
									</div>
								))}
							</div>
						</div>
					</section>

					<Footer />
				</>
			) : (
				<Loader />
			)}
		</>
	);
};
export default Home;
