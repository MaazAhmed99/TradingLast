import React, { useState, useEffect } from "react";
import "../../assets/css/signin.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Signinlogo from "../../assets/img/trading-logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/AuthActions";
import { toast } from "react-toastify";
import { Adsapi } from "../../redux/actions/CartActions";
import { GetAds } from "../../network/Network";

const Signin = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const location = useLocation();

	// Get ads
	useEffect(() => {
		GetAds()
			.then((res) => {
				console.log(res);
				dispatch(Adsapi(res?.data?.data?.ads));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const SignInHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email || !password) {
			toast.error("Please Enter All Fields");
			setLoading(false);
			return;
		}
		let data = {
			email: email,
			password: password,
		};
		console.log(data);
		setTimeout(async () => {
			setLoading(false);
			let x = await dispatch(login(data));
			console.log("response login", x);
			if (x) {
				console.log(x);
				Navigate("/");
			}
		}, 600);
	};

	return (
		<>
			<section className="signin">
				<div className="container">
					<div className="logoDv">
						<figure>
							<Link to="/">
								<img src={Signinlogo} alt="" />
							</Link>
						</figure>
					</div>
					<div className="SigninBox">
						<div className="head">
							<h4>Welcome Back to Trading Centre LTD</h4>
							<h4>
								<strong>Where we provide Best Products</strong>
							</h4>
						</div>
						<div className="actionBtn">
							<p>
								Not a Member ?<Link to="/Signup">Sign Up</Link>
							</p>
						</div>
						<form onSubmit={SignInHandler}>
							<div className="form-group">
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="form-control"
									placeholder="Email"
									required
								/>
							</div>
							<div className="form-group">
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									id="password"
									className="form-control"
									placeholder="Password"
									required
								/>
							</div>
							<button
								type="submit"
								
								disabled={loading}
							>
								{loading ? "Loading.." : "Submit"}
							</button>
						</form>
						<div className="actionBtn2">
							<p>
								<Link to="/forgotpassword">Forgot Password</Link>
							</p>
							<p>
								By Creating Account you are agree to our{" "}
								<Link to="/termcondition">Terms & conditions</Link>
							</p>
							<p>
								<Link to="/">Back To Home</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signin;
