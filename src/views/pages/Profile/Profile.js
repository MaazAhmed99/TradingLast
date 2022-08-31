import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../../assets/css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { EditProfileData, logout } from "../../../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { ramdomImage } from "../../../constant/ConstantFunction";
import { PostChangePassword, UpdateProfile } from "../../../network/Network";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ChangePasswordModal from "../../components/Modal/ChangePasswordModal";

function Profile() {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const options = [
		{ value: "", text: "--Choose an option--" },
		{ value: "Mr", text: "Mr" },
		{ value: "Ms", text: "Ms" },
		{ value: "Mrs", text: "Mrs" },
	];
	const userData = useSelector((state) => state.AuthReducer.users);
	const Token = useSelector((state) => state.AuthReducer.token);
	const [firstName, setFirstName] = useState(userData?.f_name);
	const [lastName, setLastName] = useState(userData?.l_name);
	const [email, setEmail] = useState(userData?.email);
	const [phone, setPhone] = useState(userData?.phone);
	const [address, setAddress] = useState(userData?.street_address);
	const [city, setCity] = useState(userData?.city);
	const [zip, setZip] = useState(userData?.zip || "");
	const [gender, setGender] = useState(userData?.gender);
	const [logLoading, setLogLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newFile, setNewFile] = useState("");
	const [fileupload, setFileupload] = useState(userData?.profile_url);
	const [uploadLoading, setUploadLoading] = useState(false);

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [modalBtn, setModalBtn] = useState(false);

	const LogoutHandler = (e) => {
		e.preventDefault();
		setLogLoading(true);
		setTimeout(async () => {
			setLogLoading(false);
			let x = await dispatch(logout());
			Navigate("/");
			// window.location.href = "/";
		}, 200);
	};

	const handleImageUpload = (e) => {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			setNewFile(file);
			setFileupload(reader.result);
		};
		reader.readAsDataURL(file);
		setUploadLoading(true);
	};

	const EditProfile = (e) => {
		e.preventDefault();
		setLoading(true);
		if (
			!firstName ||
			!lastName ||
			!phone ||
			!address ||
			!city ||
			!zip ||
			!gender
		) {
			setLoading(false);
			console.log(gender);

			toast.error("Please Enter All Field");
			return;
		}
		let data = new FormData();
		data.append("f_name", firstName);
		data.append("l_name", lastName);
		data.append("phone", phone);
		data.append("street_address", address);
		data.append("city", city);
		data.append("zip", zip);
		data.append("gender", gender);
		data.append("image", newFile);
		console.log(data);
		UpdateProfile(data, Token)
			.then((res) => {
				setLoading(false);
				setUploadLoading(false);
				toast.success(res?.data?.message);
				console.log(res);
				dispatch(EditProfileData(res?.data?.data?.user));
				// Navigate("/dashboard/profile");
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setUploadLoading(false);
			});
	};

	const ChangePasswordHandler = (e) => {
		e.preventDefault();
		setModalBtn(true);
		if (!currentPassword || !password || !confirmPassword) {
			toast.error("Please enter All Fields");
			setModalBtn(false);
			return;
		}
		if (password != confirmPassword) {
			toast.error("New password and confirm password must be same");
			setModalBtn(false);
			return;
		}
		let data = {
			current_password: currentPassword,
			new_password: password,
			new_confirm_password: confirmPassword,
		};
		console.log(data);
		PostChangePassword(data, Token)
			.then((res) => {
				setModalBtn(false);
				toast.success(res?.data?.message);
				setIsOpenModal(false);
				setCurrentPassword("");
				setPassword("");
				setConfirmPassword("");
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				toast.error(err?.response?.data?.message);
				setModalBtn(false);
				setIsOpenModal(false);
			});
	};

	return (
		<>
			<Header />
			<section className="profile profile-custom">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<h2 className="profile-heading">My Profile</h2>
						</div>
						<div className="col-md-6 text-right">
							<button
								className="btn btn-large logout-btn"
								onClick={(e) => LogoutHandler(e)}
								disabled={logLoading}
							>
								{logLoading ? "Loading.." : "Logout"}
							</button>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-md-4">
							<div className="flexBox-style">
								<div className="profile-pic-container">
									{uploadLoading ? (
										<img
											src={fileupload}
											className="image-fluid image-width"
											alt=""
										/>
									) : (
										<>
											{userData?.image == null ? (
												<img
													src={`${ramdomImage(
														`${userData?.first_name}{""}${userData?.last_name}`,
													)}`}
													className="image-fluid image-width"
													alt=""
												/>
											) : (
												<img
													src={`${
														fileupload ? fileupload : userData?.profile_url
													}`}
													className="image-fluid image-width"
													alt=""
												/>
											)}
										</>
									)}
								</div>
								<div className="edit-container">
									<FontAwesomeIcon icon={faCamera} className="edit-pen-icon" />
									<input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										multiple="false"
									/>
								</div>
							</div>
							<p className="mt-3" style={{ textAlign: "center" }}>
								{userData?.role}
							</p>
							<p
								className="change-password"
								style={{ textAlign: "center", marginTop: "-10px" }}
								onClick={() => setIsOpenModal(true)}
							>
								Change Password
							</p>
						</div>
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-6">
									<input
										type="text"
										placeholder="First Name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className="profile-input mt-3"
									/>
								</div>
								<div className="col-md-6">
									<input
										type="text"
										placeholder="Last Name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="profile-input mt-3"
									/>
								</div>
								<div className="col-md-6">
									<input
										type="text"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="profile-input mt-3"
										disabled={true}
									/>
								</div>
								<div className="col-md-6">
									<input
										type="text"
										placeholder="Phone Number"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className="profile-input mt-3"
									/>
								</div>
								<div className="col-md-6">
									<input
										type="text"
										placeholder="Address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										className="profile-input mt-3"
									/>
								</div>
								{/* <div className="col-md-6">
									<input
										type="text"
										placeholder="Zip Code"
										value={zip?.toUpperCase()}
										onChange={(e) => setZip(e.target.value)}
										className="profile-input mt-3"
									/>
								</div> */}
								<div className="col-md-6">
									<input
										type="text"
										placeholder="City"
										value={city?.toUpperCase()}
										onChange={(e) => setCity(e.target.value)}
										className="profile-input mt-3"
									/>
								</div>
								<div className="col-md-12">
									{/* <select name="" id="" className="profile-input mt-3"> */}
									<select
										value={gender}
										onChange={(e) => setGender(e.target.value)}
										className="profile-input mt-3"
										style={{
											outline: "none",
											border: "none",
											background: "#f2f2f2",
											borderRadius: "15px",
										}}
									>
										{options.map((option) => (
											<option key={option.value} value={option.value}>
												{option.text}
											</option>
										))}
									</select>

									{/* <input
										type="text"
										placeholder="Gender"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
										className="profile-input mt-3"
									/> */}
								</div>
							</div>
							<div style={{ textAlign: "center" }} className="mt-3">
								<button
									type="button"
									className="btn btn-success btn-SaveProfile"
									onClick={(e) => EditProfile(e)}
									disabled={loading}
								>
									{loading ? "Loading..." : "Save"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
			<ChangePasswordModal
				setIsOpenModal={setIsOpenModal}
				isOpenModal={isOpenModal}
				confirmPassword={confirmPassword}
				setConfirmPassword={setConfirmPassword}
				setPassword={setPassword}
				password={password}
				setCurrentPassword={setCurrentPassword}
				currentPassword={currentPassword}
				ChangePasswordHandler={ChangePasswordHandler}
				modalBtn={modalBtn}
				setModalBtn={setModalBtn}
			/>
		</>
	);
}

export default Profile;
