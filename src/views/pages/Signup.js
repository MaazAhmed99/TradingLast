import React, { useEffect, useState } from "react";
import "../../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import Signuplogo from "../../assets/img/trading-logo.png";
import { signUp } from "../../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [btnLoading, setBtnLoading] = useState(false);
	const [checked, setChecked] = useState("");
	const isSignup = useSelector((state) => state.AuthReducer.isSignup);

	const SignUpHandler = async (e) => {
		e.preventDefault();
		setBtnLoading(true);
		if (!firstName || !lastName || !email || !phone || !password || !checked) {
			toast.error("Please Enter All Fields");
			setBtnLoading(false);
			return;
		}
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email,
			)
		) {
			toast.error("Invalid Email");
			setBtnLoading(false);
			return;
		} else {
			let data = {
				f_name: firstName,
				l_name: lastName,
				email: email,
				phone: phone,
				password: password,
				is_trader: checked === "trader" ? true : false,
			};
			console.log(data);
			setBtnLoading(false);
			await dispatch(signUp(data));
		}
	};

	useEffect(() => {
		if (isSignup) {
			Navigate("/");
		}
	}, [isSignup]);

	const handleSelectCategory = (id) => {
		setChecked(id);
	};

	console.log(checked);
	return (
		<>
			<section className="signup">
				<div className="container">
					<div className="logoDv">
						<figure>
							<Link to="/">
								<img src={Signuplogo} alt="" />
							</Link>
						</figure>
					</div>
					<div className="signupBox">
						<div className="head">
							<h4>Welcome Back to Trading Centre LTD</h4>
							<h4>
								<strong>Where we provide Best Products</strong>
							</h4>
						</div>
						<div className="actionBtn">
							<p>
								Already a Member ?<Link to="/Signin">Sign In</Link>
							</p>
						</div>
						<form onSubmit={SignUpHandler} >
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="First Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Last Name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="number"
									className="form-control"
									placeholder="Phone Number"
									value={phone}
									required
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									value={password}
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="form-group checkBox-container">
								<div>
									<input
										className="form-check-input"
										type="radio"
										name="role"
										id="trader"
										value={checked}
										required
										onChange={(e) => handleSelectCategory("trader")}
									/>
									<label>Trader</label>
								</div>
								<div>
									<input
										className="form-check-input"
										type="radio"
										name="role"
										id="customer"
										value={checked}
										required
										onChange={(e) => handleSelectCategory("customer")}
									/>
									<label>Customer</label>
								</div>
							</div>

							<button
								type="submit"
								
								disabled={btnLoading}
							>
								{btnLoading ? "Loading.." : "Creat Account"}
							</button>
						</form>
						<div className="actionBtn2">
							<p className="ml-2">
								<Link to="/">Back To Home</Link>
							</p>
							<p>
								By Creating Account you are agree to our{" "}
								<Link to="/termcondition">Terms & conditions</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signup;
