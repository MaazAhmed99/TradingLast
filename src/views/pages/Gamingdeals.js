import React from "react";
import "../../assets/css/gamingdeals.css";
import Slider from "react-slick";
import slide1 from "../../assets/img/i-1.jpg";
import slide2 from "../../assets/img/i-2.jpg";
import slide3 from "../../assets/img/i-3.jpg";
import slide4 from "../../assets/img/i-4.jpg";
import pro1 from "../../assets/img/redled.png";
import pro2 from "../../assets/img/pr-2.jpg";
import pro3 from "../../assets/img/pr-3.jpg";
import slide5 from "../../assets/img/i-5.jpg";
import gammingbanner from "../../assets/img/gaming.png";
import addimg from "../../assets/img/ad1.png";
import mobilebanner from "../../assets/img/mobilephone.png";
import jiggle1 from "../../assets/img/img-left.png";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Gamingdeals = () => {
	const regularSlider = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
	};
	const CardImg = [
		{
			img: slide1,
		},
		{
			img: slide2,
		},
		{
			img: slide3,
		},
		{
			img: slide4,
		},
		{
			img: slide5,
		},
		{
			img: slide1,
		},
		{
			img: slide2,
		},
		{
			img: slide3,
		},
		{
			img: slide4,
		},
		{
			img: slide5,
		},
	];
	const productDetail = [
		{
			id: 1,
			badge: "20% off",
			img: pro1,
			name: "By Lorem",
			description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
			saleprice: "$158.07",
			regprice: "$192.07",
		},
		{
			id: 2,
			badge: "20% off",
			img: pro2,
			name: "By Lorem",
			description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
			saleprice: "$158.07",
			regprice: "$192.07",
		},
		{
			id: 3,
			badge: "20% off",
			img: pro3,
			name: "By Lorem",
			description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
			saleprice: "$158.07",
			regprice: "$192.07",
		},
	];
	return (
		<>
			<img src={jiggle1} className="img-tls" alt="" />

			<Header />

			{/* <!-- Banner Section Start Here --> */}
			<section className="banner universal-banner">
				<div className="container">
					<div className="breadcrumbs">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									GamingDeals
								</li>
							</ol>
						</nav>
					</div>
					<div className="Banner">
						<div className="banner-box">
							<figure>
								<img src={`gammingbanner`} alt="" />
							</figure>
						</div>
						<div className="contentDv">
							<div className="contentFlex">
								<p>Lorem ipsum dolor sit amet</p>
								<h2 className="fw-600 font-80 line-height-50">
									30 %<span className="font-40 fw-400">Off on</span>
								</h2>
								<h3 className="fw-600 font-80 line-height-50 subtitle">
									Gadgets
								</h3>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- Banner Section Start Here --> */}

			{/* <!-- Product Slider Start Here --> */}
			<div className="container">
				<div className="row pb-4">
					<div className="col-md-6">
						<h5 className="sub-heading fw-600 font-20">Some Best Products</h5>
					</div>
				</div>
				<div className="regular">
					<Slider {...regularSlider}>
						{CardImg.map((item, index) => (
							<Cards key={index} item={item} />
						))}
					</Slider>
				</div>
			</div>
			{/* <!-- Product Slider End Here --> */}

			{/* <!-- Gaming Products Start Here --> */}
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

									{/* <!--  --> */}
									<div id="accordion">
										<div className="card">
											<div className="card-header" id="ToggleOne">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle"
														aria-expanded="false"
														aria-controls="mainToggle"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck1"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck1"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle"
												className="collapse show"
												aria-labelledby="ToggleOne"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleOne"
																		aria-expanded="false"
																		aria-controls="InnerToggleOne"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleOne"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleTwo">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle2"
														aria-expanded="false"
														aria-controls="mainToggle2"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck2"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck2"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle2"
												className="collapse"
												aria-labelledby="ToggleTwo"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleTwo"
																		aria-expanded="false"
																		aria-controls="InnerToggleTwo"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleTwo"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleThree">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle3"
														aria-expanded="false"
														aria-controls="mainToggle3"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck3"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck3"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle3"
												className="collapse"
												aria-labelledby="ToggleThree"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleThree"
																		aria-expanded="false"
																		aria-controls="InnerToggleThree"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleThree"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleFour">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle4"
														aria-expanded="false"
														aria-controls="mainToggle4"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck4"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck4"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle4"
												className="collapse"
												aria-labelledby="ToggleFour"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleFour"
																		aria-expanded="false"
																		aria-controls="InnerToggleFour"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleFour"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleFive">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle5"
														aria-expanded="false"
														aria-controls="mainToggle5"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck5"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck5"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle5"
												className="collapse"
												aria-labelledby="ToggleFive"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleFive"
																		aria-expanded="false"
																		aria-controls="InnerToggleFive"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleFive"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleSix">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle6"
														aria-expanded="false"
														aria-controls="mainToggle6"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck6"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck6"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle6"
												className="collapse"
												aria-labelledby="ToggleSix"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleSix"
																		aria-expanded="false"
																		aria-controls="InnerToggleSix"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleSix"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" id="ToggleSeven">
												<h5 className="mb-0">
													<button
														className="btn btn-link"
														data-toggle="collapse"
														data-target="#mainToggle7"
														aria-expanded="false"
														aria-controls="mainToggle7"
													>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																defaultValue=""
																id="defaultCheck7"
															/>
															<label
																className="form-check-label"
																htmlFor="defaultCheck7"
															>
																<div className="name">
																	<span>Lorem</span>
																</div>
															</label>
														</div>
														<div className="angls">
															<i
																className="fa fa-angle-down"
																aria-hidden="true"
															></i>
														</div>
													</button>
												</h5>
											</div>
											<div
												id="mainToggle7"
												className="collapse"
												aria-labelledby="ToggleSeven"
												data-parent="#accordion"
											>
												<div className="card-body">
													{/* <!-- inner Accordion --> */}
													<div id="accordion-inner">
														<div className="card">
															<div className="card-header" id="innerToggle">
																<h5 className="mb-0">
																	<button
																		className="btn btn-link pl-4"
																		data-toggle="collapse"
																		data-target="#InnerToggleSeven"
																		aria-expanded="false"
																		aria-controls="InnerToggleSeven"
																	>
																		<div className="form-check">
																			<input
																				className="form-check-input"
																				type="checkbox"
																				defaultValue=""
																				id="defaultCheck2"
																			/>
																			<label
																				className="form-check-label"
																				htmlFor="defaultCheck2"
																			>
																				<div className="name">
																					<span>Lorem</span>
																				</div>
																			</label>
																		</div>
																		<div className="angls">
																			<i
																				className="fa fa-angle-down"
																				aria-hidden="true"
																			></i>
																		</div>
																	</button>
																</h5>
															</div>

															<div
																id="InnerToggleSeven"
																className="collapse"
																aria-labelledby="innerToggle"
																data-parent="#accordion-inner"
															>
																<div className="card-body">
																	<div className="inner-content card card-body inner-text">
																		<a href="#settings">Lorem</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* <!-- inner Accordion --> */}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="price-filter">
									<div className="head filter-border pt-4">
										<h4 className="font-25">Price</h4>
									</div>
									<div className="range-head">
										<p>Range:</p>
										<p className="fw-600">$1 - $900</p>
									</div>
									<div className="range-slide pb-3">
										<div className="from">
											<label htmlFor="from">From</label>
											<br />
											<input type="number" defaultValue="1" id="from" />
										</div>
										<div className="spacer"></div>
										<div className="from">
											<label htmlFor="to">To</label>
											<br />
											<input type="number" id="to" defaultValue="900" />
										</div>
									</div>
								</div>

								<div className="brand-filter">
									<div className="head filter-border py-3">
										<h4 className="font-25">Brands</h4>
									</div>
									<div className="brands">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												defaultValue=""
												id="defaultCheck8"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck8"
											>
												<div className="name">
													<span className="font-14">Lorem</span>
												</div>
											</label>
										</div>
										<div className="brandCount">
											<span className="font-14">120</span>
										</div>
									</div>
									<div className="brands">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												defaultValue=""
												id="defaultCheck9"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck9"
											>
												<div className="name">
													<span className="font-14">Lorem</span>
												</div>
											</label>
										</div>
										<div className="brandCount">
											<span className="font-14">120</span>
										</div>
									</div>
									<div className="brands">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												defaultValue=""
												id="defaultCheck10"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck10"
											>
												<div className="name">
													<span className="font-14">Lorem</span>
												</div>
											</label>
										</div>
										<div className="brandCount">
											<span className="font-14">120</span>
										</div>
									</div>
									<div className="brands">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												defaultValue=""
												id="defaultCheck11"
											/>
											<label
												className="form-check-label"
												htmlFor="defaultCheck11"
											>
												<div className="name">
													<span className="font-14">Lorem</span>
												</div>
											</label>
										</div>
										<div className="brandCount">
											<span className="font-14">120</span>
										</div>
									</div>
								</div>

								<div className="ads-banner">
									<figure>
										<img src={addimg} alt="" />
									</figure>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<div className="topBar">
								<div className="heading">
									<h2 className="font-60">Hot Deals</h2>
								</div>
								<div className="sort-btn">
									<button className="font-20">Sort By: High To low</button>
								</div>
							</div>
							<div className="row">
								{productDetail.map((productitem, index) => (
									<div className="col-md-4 pt-2 my-4">
										<Products key={index} productitem={productitem} />
										<Products key={index} productitem={productitem} />
									</div>
								))}
							</div>

							<div className="box py-4">
								<img src={mobilebanner} className="img-fluid" alt="" />
								<div className="bottom-left">
									<a
										href="#"
										className="btnbl text-black font-12"
										tabIndex="-1"
									>
										Lorem ipsum dolor
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
														fill="#000"
													/>
												</g>
											</g>
										</svg>
									</a>
								</div>

								<div className="m-centered">
									<p className="text-black line-height-1 font-25">
										Lorem ipsum dolor
									</p>
									<h2 className="text-black line-height-1 font-35">
										Mobile Phones
									</h2>
								</div>
							</div>

							<div className="row">
								{productDetail.map((productitem, index) => (
									<div className="col-md-4 pt-2 my-4">
										<Products key={index} productitem={productitem} />
									</div>
								))}
							</div>

							<div className="pagination">
								<div className="pafination-Flex">
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- Gaming Products End Here --> */}

			<Footer />
		</>
	);
};

export default Gamingdeals;
