import React, { useEffect, useState } from "react";
import "../../../assets/css/products.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import jiggle2 from "../../../assets/img/img-left.png";
import Cards from "../../components/Cards";
import Products from "../../components/Products";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Accordians from "../../components/Accordian/Accordians";
import { useSelector } from "react-redux";
import {
	GetAllProducts,
	GetFilterBrands,
	GetHomeBanner,
	GetProductsFilter,
	PostPriceFilter,
} from "../../../network/Network";
import { SpinnerCircular } from "spinners-react";
import PriceRange from "../../components/SideFilter/PriceRange";
import BrandFilter from "../../components/SideFilter/BrandFilter";
import MuiAccordian from "../../components/Accordian/MuiAccordian";
import ReactPaginate from "react-paginate";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { boolean } from "yup";

function AllProducts() {
	const Categories = useSelector((state) => state.AuthReducer.categoriesData);
	const BrandsDataRedux = useSelector((state) => state.AuthReducer.brands);
	const AdsData = useSelector((state) => state.CartReducer.ads);
	const TopProductsRedux = useSelector(
		(state) => state.CartReducer.topProducts,
	);
	const regularSlider = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
	};

	const [checked, setChecked] = useState("");
	const [CateId, setCateId] = useState(checked);
	const [brandId, SetBrandId] = useState(checked);
	const [productsData, setProductsData] = useState([]);
	const [NextDataUrl, setNextDataUrl] = useState();
	const [PreDataUrl, setPreDataUrl] = useState();
	const [spinLoad, setSpinLoad] = useState(false);
	const [pageCount, setPageCount] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [startPrice, setStartPrice] = useState(1);
	const [endPrice, setEndPrice] = useState(10000);

	const [highToLow, setHighToLow] = useState(null);
	const [productImages, setProductImages] = useState([]);
	const [bannerData, setBannerData] = useState();
	const [loader, setLoader] = useState(true);


	const handleSelectCategory = (id) => {
		console.log("11111111111111111111111111111111111111", id);
		setChecked(id);
	};


	const handlePageClick = async (data) => {
		// console.log(data.selected);
		setCurrentPage(data?.selected + 1);
	};


	// useEffect(() => {
	// 	setSpinLoad(true);
	// 	GetAllProducts(currentPage, highToLow)
	// 		.then((res) => {
	// 			console.log(res);
	// 			setProductsData(res?.data?.data?.products?.data);
	// 			setProductImages(res?.data?.data?.products?.data);
	// 			const total = res?.data?.data?.products?.total;
	// 			const limit = res?.data?.data?.products?.per_page;
	// 			setPageCount(Math.ceil(total / limit));
	// 			setSpinLoad(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setSpinLoad(false);
	// 		});
	// }, [currentPage, highToLow]);

	const ApiProduct = (data) => {
		console.log("worked from filter", data)

		GetAllProducts(currentPage, data)
			.then((res) => {
				console.log("zzzzzzzzzzzzzzzzzzzzzzzzzz", res);
				setProductsData(res?.data?.data?.data);
				setProductImages(res?.data?.data?.products?.data);
				setNextDataUrl(res?.data?.data?.next_page_url);
				setPreDataUrl(res?.data?.data?.prev_page_url);
				setSpinLoad(false);
			})
			.catch((err) => {
				console.log(err);
				console.log("err")
				setSpinLoad(false);
			});
	}


	useEffect(() => {
		setSpinLoad(true);
		const data = {}
		ApiProduct(data)

	}, [currentPage]);

	const handleSelectCate = (id, checked) => {
		console.log(".........................", id);

		if (checked) {
			setCateId(id);
			let data = {
				highToLow: highToLow,
				price_start: startPrice,
				price_end: endPrice,
				category_id: id,
				brand_id: brandId,
			}
			ApiProduct(data)
		} else {
			setSpinLoad(true);
			setCateId(null);
			const data = {
				currentPage
			}
			ApiProduct(data)
		}

	};

	useEffect(() => {
		setSpinLoad(true);
		let data = {
			highToLow: highToLow,
			price_start: startPrice,
			price_end: endPrice,
			category_id: CateId,
			brand_id: "",
		}
		ApiProduct(data)
	}, [CateId]);


	const handleSelectBrand = (id, checked) => {
		if (id === brandId) {
			SetBrandId("");
			let data = {
				highToLow: highToLow,
				price_start: startPrice,
				price_end: endPrice,
				category_id: CateId,
				brand_id: "",
			};
			ApiProduct(data);

		} else {
			SetBrandId(id);
			let data = {
				highToLow: highToLow,
				price_start: startPrice,
				price_end: endPrice,
				category_id: CateId,
				brand_id: id,
			};
			console.log(id);
			ApiProduct(data);
		}


		// if (checked) {
		// 	SetBrandId(id);
		// 	console.log(id)
		// 	ApiProduct(data)
		// } else {
		// 	setSpinLoad(true);
		// 	SetBrandId(null);
		// 	const data = {
		// 		currentPage
		// 	}
		// 	ApiProduct(data)
		// }
	};


	// Get Filter Brands
	useEffect(() => {
		setSpinLoad(true);
		let data = {
			highToLow: highToLow,
			price_start: startPrice,
			price_end: endPrice,
			category_id: CateId,
			brand_id: brandId,
		};
		ApiProduct(data)
	}, []);

	// useEffect(() => {
	//   setSpinLoad(true);
	//   let data = {
	//     start: startPrice,
	//     end: endPrice,
	//     id: checked,
	//   };
	//   PostPriceFilter(currentPage, data)
	//     .then((res) => {
	//       console.log("price", res);
	//       setProductsData(res?.data?.data?.products?.data);
	//       const total = res?.data?.data?.products?.total;
	//       const limit = res?.data?.data?.products?.per_page;
	//       setPageCount(Math.ceil(total / limit));
	//       setSpinLoad(false);
	//     })
	//     .catch((err) => {
	//       console.log(err);
	//       setSpinLoad(false);
	//     });
	// }, [currentPage, startPrice, endPrice]);

	const PriceFilterHandler = (e) => {
		e.preventDefault();
		setSpinLoad(true);
		let data = {
			highToLow: highToLow,
			price_start: startPrice,
			price_end: endPrice,
			category_id: "",
			subcategory_id: CateId,
			brand_id: brandId,
		};
		ApiProduct(data)
	};

	const HIghLowFunc = (e) => {
		console.log("workinedddzxiiichuzizuxhcizuxhcuizxhcu");
		setHighToLow(e);
		setSpinLoad(true);
		let data = {
			highToLow: e,
			price_start: startPrice,
			price_end: endPrice,
			category_id: "",
			subcategory_id: CateId,
			brand_id: brandId,
		};
		ApiProduct(data)
	}

	useEffect(() => {
		let data = {
			type: "all",
		};
		GetHomeBanner(data)
			.then((res) => {
				console.log("banner", res);
				let i;
				let arr = [];
				for (i = 0; i < res?.data.length; i++) {
					console.log(res.data?.[i]);
					if (res?.data?.[i].banner_type === "product_page") {
						arr.push(res?.data?.[i]);
						console.log(res.data?.[i]);
					}
				}
				// console.log("new", arr);
				setBannerData(arr);
				console.log("78789933300000000", bannerData)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// console.log(bannerData);
	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 4000);
	}, [spinLoad]);
	// console.log(productsData.category_ids);

	const HandleNext = async () => {
		let next = NextDataUrl;
		let data = await axios.get(next)
		//    console.log(data.data);
		setProductsData(data?.data?.data?.data);
		setNextDataUrl(data?.data?.data?.next_page_url);
		setPreDataUrl(data?.data?.data?.prev_page_url);
	}

	const HandlePre = async () => {
		// if(currentPage => 1){
		let prev = PreDataUrl;
		let data = await axios.get(prev)
		// console.log(data.data);
		setProductsData(data?.data?.data?.data);
		setPreDataUrl(data?.data?.data?.prev_page_url);
		setNextDataUrl(data?.data?.data?.next_page_url);
		// }
	}


	return (
		<>
			{!loader ? (
				<>
					<img src={jiggle2} className="img-tls" alt="" />
					<Header setChecked={setChecked} />

					<section className="banner universal-banner">
						<div className="container">
							<div className="breadcrumbs">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item">
											<Link to="/">Home</Link>
										</li>
										<li className="breadcrumb-item active" aria-current="page">
											All Product Page
										</li>
									</ol>
								</nav>
							</div>
							{bannerData?.length >= 0 ? (
								<div className="Banner">
									<div className="banner-box">
										<figure>
											<img src={bannerData[0]?.banner_image_url} alt="" />
										</figure>
									</div>
									<div className="contentDv">
										<div className="contentFlex">
											<p className="font-25">{bannerData?.[0]?.sub_title}</p>
											<h3 className="fw-600 font-80 line-height-50 subtitle">
												{bannerData?.[0]?.title}
											</h3>
											<p>{bannerData?.[0]?.description}</p>
										</div>
									</div>
								</div>
							) : null}
						</div>
					</section>
					{/* <!-- Banner Section Start Here --> */}

					{/* <!-- Product Slider Start Here --> */}
					<div className="container">
						<div className="row pb-4">
							<div className="col-md-6">
								<h5 className="sub-heading fw-600 font-20">
									Some Best Products
								</h5>
							</div>
						</div>
						<div className="regular">
							<Slider {...regularSlider}>
								{TopProductsRedux?.map((item, index) => (
									<Cards index={index} item={item} />
								))}
							</Slider>
						</div>
					</div>
					{/* <!-- Product Slider End Here --> */}

					{/* <!-- Products Start Here --> */}
					<section className="hotdeals">
						<div className="container">
							<div className="row">
								<div className="col-md-3">
									<div className="filters">
										<div className="filters-head filter-border py-2">
											<h3 className="font-35 text-black">Apply Filters</h3>
										</div>
										<div className="categories">
											<div className="head py-3">
												<h4 className="font-25">Categories</h4>
											</div>

											<div id="accordion">
												{Categories?.map((item, index) => {
													return (
														<MuiAccordian
															item={item}
															index={index}
															handleSelectCategory={handleSelectCategory}
															handleSelectCate={handleSelectCate}
															checked={checked}
															CateId={CateId}
														/>
													);
												})}
											</div>
										</div>

										<PriceRange
											setStartPrice={setStartPrice}
											startPrice={startPrice}
											setEndPrice={setEndPrice}
											endPrice={endPrice}
											PriceFilterHandler={PriceFilterHandler}
										/>
										<BrandFilter
											BrandsDataRedux={BrandsDataRedux}
											handleSelectCategory={handleSelectCategory}
											handleSelectBrand={handleSelectBrand}
											brandId={brandId}
										// checked={checked}
										/>

										{/* <div className="ads-banner">
											<figure>
												<img
													src={AdsData[1]?.image_url}
													alt=""
													className="image-fluid"
												/>
											</figure>
										</div> */}
									</div>
								</div>
								<div className="col-md-9">
									<div className="topBar">
										<div className="heading">
											{/* <h2 className="font-60">{cateData?.name}</h2> */}
										</div>
										<div className="sort-btn">
											{!highToLow || highToLow === "low_to_high" ? (
												<button
													className="font-20"
													onClick={() => HIghLowFunc("high_to_low")}
												>
													Sort By: High To low
												</button>
											) : (
												<button
													className="font-20 ml-3"
													onClick={() => HIghLowFunc("low_to_high")}
												>
													Sort By: Low To High
												</button>
											)}
										</div>
									</div>
									<div className="row">
										{spinLoad ? (
											<>
												<div className="loader-container">
													<SpinnerCircular size="80px" color="#8dc63e" />
												</div>
											</>
										) : (
											<>
												{productsData ? (
													productsData?.map((item, index) => (
														<div className="col-md-4 pt-2 " key={index}>
															{index < 3 ? (
																<Products item={item} index={index} />
															) : null}
														</div>
													))
												) : (
													<p>Product not found</p>
												)}
											</>
										)}
									</div>

									<div className="box py-4 mb-3 mt-5">
										<img
											src={AdsData[0]?.image_url}
											className="img-fluid cursor_pointer"
											alt=""
											onClick={() => { window.open(`${AdsData[0]?.url}`) }}
										/>
										<div className=" bottom-left">
											<p
												// to={`${AdsData[0]?.url}`}
												// target="_blank"
												className="btnbl text-black font-12"
												tabIndex="-1"
											>
												{AdsData[0]?.button_name}
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
																stroke="#000"
																stroke-width="1"
															>
																<circle cx="15" cy="15" r="15" stroke="none" />
																<circle cx="15" cy="15" r="14.5" fill="none" />
															</g>
															<path
																id="Icon_awesome-arrow-right"
																data-name="Icon awesome-arrow-right"
																d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
																transform="translate(358.94 1977.355)"
																fill="#000"
															/>
														</g>
													</g>
												</svg>
											</p>
										</div>

										<div className="m-centered">
											<p className="text-black line-height-1 font-25">
												{AdsData[0]?.title}
											</p>
											<h2 className="text-black line-height-1 font-35">
												{AdsData[0]?.sub_title}
											</h2>
										</div>
									</div>

									<div className="row ">
										{spinLoad ? (
											<>
												<div className="loader-container">
													<SpinnerCircular size="80px" color="#8dc63e" />
												</div>
											</>
										) : (
											productsData?.map((item, index) => (
												<div className="col-md-4 pt-2 my-3	" key={index}>
													{index > 2 ? (
														<Products item={item} index={index} />
													) : null}
												</div>
											))
										)}
									</div>

									<div className="pagination-container mt-5 d-flex flex-row w-100 justify-content-between">

										{PreDataUrl && (
											<p className="btn btn-light bt-nxt-allprodcts" onClick={HandlePre}>Previous Page</p>
										)}

										{NextDataUrl && (
											<p onClick={HandleNext} className="btn btn-light bt-nxt-allprodcts" >Next Page</p>
										)}
									</div>

									{/* <div className="pafination-Flex">
                  <ul className="items">
                    <li className="pagi arrow prev-arrow">
                      <a href="#!">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="pagi">
                      <a href="#!">1</a>
                    </li>
                    <li className="pagi active">
                      <a href="#!">2</a>
                    </li>
                    <li className="pagi">
                      <a href="#!">...</a>
                    </li>
                    <li className="pagi">
                      <a href="#!">12</a>
                    </li>
                    <li className="pagi arrow next-arrow">
                      <a href="#!">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div> */}
								</div>
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
}

export default AllProducts;
