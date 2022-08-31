import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import post1 from "../../assets/img/items-101.png";
import post2 from "../../assets/img/items-102.png";
import post3 from "../../assets/img/items-103.png";
import post4 from "../../assets/img/items-104.png";
import {
	CompanyInfo,
	GetNews,
	PostNewsLetter,
	SocialLinks,
} from "../../network/Network";
import { useDispatch, useSelector } from "react-redux";
import {
	CompanyInfoStore,
	SocialMediaStore,
} from "../../redux/actions/AuthActions";
import { Link } from "react-router-dom";
import moment from "moment";

const Footer = () => {
	const dispatch = useDispatch();
	const SocialMediaData = useSelector((state) => state.AuthReducer.socialMedia);
	const CompanyInfoRedux = useSelector(
		(state) => state.AuthReducer.companyInfo,
	);

	const [email, setEmail] = useState(" ");
	const [loading, setLoading] = useState(false);
	const [newsData, setNewsData] = useState([]);

	const NewsLetterHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email) {
			toast.error("Please Enter Email");
			setLoading(false);
			return;
		}
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email,
			)
		) {
			toast.error("Invalid Email");
			setLoading(false);
			return;
		}
		let data = {
			email: email,
		};
		// console.log(data);
		PostNewsLetter(data)
			.then((res) => {
				setLoading(false);
				// console.log(res);
				toast.success("Join Newsletter Successfully!!");
				setEmail("");
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err?.response?.data?.message);
				// toast.error("Already Subscribe");
				console.log(err);
			});
	};

	// Get Social Links
	useEffect(() => {
		SocialLinks()
			.then((res) => {
				// console.log(res);
				dispatch(SocialMediaStore(res?.data?.data?.social));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get CompanyInfo
	useEffect(() => {
		CompanyInfo()
			.then((res) => {
				// console.log(res);
				dispatch(CompanyInfoStore(res?.data?.data?.contact));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Get News
	useEffect(() => {
		GetNews()
			.then((res) => {
				// console.log(res);
				setNewsData(res?.data?.data?.blogs);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// console.log(CompanyInfoRedux, 'klfjslkdsfjlksdz;;;;;;;;;;;;;')

	return (
		<>
			<div className="container newsletter-back">
				<div className="row">
					<div className="col-md-6">
						<div>
							<h2 className="fw-700 text-white">Newsletter</h2>
							<p className="text-white">
								Subscribe to our Newsletter to get <br />
								our Latest Updates.
							</p>
						</div>
					</div>
					<div className="col-md-6">
						<div>
							<form className="newsletter">
								<div className="form-group">
									<input
										type="email"
										className="form-control"
										id="inputEmail"
										placeholder="Your Email Here*"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<button
										className="btn btn-primary btn-block"
										type="button"
										onClick={(e) => NewsLetterHandler(e)}
										disabled={loading}
									>
										{loading ? "Loading.." : "Submit"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<footer className="footer pb-5 cover-banner">
				<div className="container">
					<div className="row pb-3">
						<div className="col-md-3 logo-m widgets2">
							<img
								src="img/logo-home-1.png"
								className="img-fluid pb-3"
								alt=""
							/>
							<p className="text-white">
								Many businesses, large and small, have a huge source of great
								ideas that can help them improve, innovate, and grow, and yet so
								many of these companies.
							</p>
							<p className="text-white">
								<i className="fa fa-map-marker"></i> London, UK 441
							</p>
							<p className="text-white">
								<i className="fa fa-phone"></i> Phone:{" "}
								{CompanyInfoRedux?.phone?.value}
							</p>
							<p className="text-white">
								<i className="fa fa-envelope"></i> Email:{" "}
								{CompanyInfoRedux?.email?.value}
							</p>

							<ul className="social-media-list">
								{SocialMediaData?.map((item, index) => {
									// console.log(item, 'item icoooooooozzzzzzzzzzz');
									return (
										<li key={item?.id}>
											<a href={`${item?.link}`} target="_blank">
												<i className={item?.icon}></i>
											</a>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="col-md-3 widgets2">
							<h4 className="pb-3 text-white border-bottom">recent news</h4>
							{newsData?.data?.map((item, index) => {

								return (
									index < 3 && (
										<p className="pt-4" key={index}>
											<a className="text-white">
												{" "}
												<b> {item?.title} </b>
												<br />
												<i className="fa fa-clock-o yellow"></i>{" "}
												<span className="font-12 text-gry">
													{moment(item?.updated_at).format("MMMM Do YYYY, h:mm")}
												</span>
											</a>
										</p>
									)
								);
							})}
						</div>
						<div className="col-md-3 widgets2">
							<h4 className="pb-3 text-white border-bottom">extra links</h4>
							<div className="d-flex">
								<ul className="mt-4">
									<li>
										{" "}
										<Link to="/Hotdeals"> Hot Deals </Link>
									</li>
									<li>
										{" "}
										<Link to="/faqs"> FAQ's </Link>
									</li>
									<li>
										{" "}
										<Link to="/Contact"> Contact Us</Link>
									</li>
								</ul>
								<ul className="mt-4 pl-5">
									<li>
										{" "}
										<Link to="/allproducts"> Products </Link>
									</li>
									<li>
										{" "}
										<Link to="/Delivery"> Delivery Information </Link>
									</li>
									<li>
										{" "}
										<Link to="/blog">Blogs </Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-3 widgets2">
							<h4 className="pb-3 text-white border-bottom">extra links</h4>
							<div className="d-flex"></div>
							<ul className="mt-4 pl-5">
								<li>
									<Link to="/termsandcondition">Terms And Condition</Link>
								</li>
								<li>
									<Link to="/privacypolicy">Privacy Policy</Link>
								</li>
								<li>
									<Link to="/cookiepolicy">Cookie Policy</Link>
								</li>
								<li>
									<Link to="/refundpolicy">Refund Policy</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="row border-top justify-content-center">
						<div className="col-md-8 pt-5">

							<img src={`${CompanyInfoRedux?.footer_logo}`} width="150" className="pl-2 img-fluid" alt="" />
							{/* <img src={post2} width="150" className="pl-2 img-fluid" alt="" />
							<img src={post3} width="150" className="pl-2 img-fluid" alt="" />
							<img src={post4} width="150" className="pl-2 img-fluid" alt="" /> */}
						</div>
						<div className="col-md-4 pt-5">
							<p className="text-white ">
								On Sale 70% DisCount <br />
								Best Products of the Month
							</p>
						</div>
					</div>
				</div>
			</footer>

			<div className="container-fluid footer-copyright ">
				<div className="container text-center">
					<div className="row">
						<div className="col-md-12">
							<p className="copyright">
								© {new Date().getFullYear()} Trading Centre LTD. All Right
								Reserved
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
