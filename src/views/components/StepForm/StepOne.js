import React, { useState } from "react";
function StepOne(props) {
	const {
		StepOneContinue,
		handleNext,
		CheckOutData,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		phone,
		setPhone,
		email,
		setEmail,

		region,
		setRegion,
		postalCode,
		setPostalCode,
		setTownCity,
		townCity,
		address,
		setAddress,
		setLoading,
		loading,
		countryData,
	} = props;
	const regionData = [
		{
			id: 1,
			name: "California",
		},
		{
			id: 2,
			name: "Manchester",
		},
	];

	console.log(CheckOutData);

	const [req, setReq] = useState(false);
	const ReqHandler = (e) => {
		e.preventDefault();
		if (!region) {
			setReq(true);
			return;
		}
	};

	return (
		<>
			<h2 className="font-40 fw-600 text-center pb-5">Shipment Address</h2>
			<div className="row stepOne">
				<div className="col-md-7">
					<div className="setpper-step-container">
						<div className="addressDetail">
							<div className="head">
								<h4 className="font-20 fw-600">Enter Your Address Details</h4>
							</div>
							<form
								onSubmit={(e) => {
									StepOneContinue(e);
									ReqHandler(e);
								}}
							>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<input
												required
												type="text"
												className="form-control"
												placeholder="First Name"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input
												required
												type="text"
												className="form-control"
												placeholder="Last Name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input
												required
												type="number"
												className="form-control"
												placeholder="Phone Number"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input
												required
												type="email"
												className="form-control"
												placeholder="Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<select
												className="region"
												onChange={(e) => {
													setRegion(e.target.value);
												}}
												value={region}
												required={true}
											>
												<option value={""}>Select a Region</option>
												{countryData?.map((item, index) => {
													console.log("namezzzzzzzzzzzzzzzzz",item);
													return (
														<option value={item?.name} key={item?.id} required>
															{item?.name}
														</option>
													);
												})}
											</select>
											{/* {req ? (<p style={{color:"red", marginLeft:"20px"}}>required* Region</p>) : (null)} */}
										</div>
									</div>
									{/* <div className="col-md-6">
										<div className="form-group">
											<input
												// required
												type="text"
												placeholder="Postal code"
												className="form-control"
												value={postalCode}
												onChange={(e) => setPostalCode(e.target.value)}
											/>
										</div>
									</div> */}
									<div className="col-md-12">
										<div className="form-group">
											<input
												required
												type="text"
												placeholder="Town City"
												className="form-control"
												value={townCity}
												onChange={(e) => setTownCity(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<textarea
												required
												placeholder="Enter Your Address"
												className="form-control"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
											></textarea>
										</div>
									</div>
								</div>
								<ul className="list-inline">
									<li>
										<button
											type="submit"
											className="default-btn next-step"
											disabled={loading}
										>
											{loading ? "Loading.." : "Continue to next step"}
										</button>
									</li>
								</ul>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-5 setpper-step-container">
					<div className="OrderSummary">
						<div className="headingg">
							<h3 className="font-25 pb-3">Order Summery</h3>
						</div>
						<div className="order_info">
							<div className="itemTotal order-flex">
								<div className="property">
									<h5 className="fw-500">Item Total:</h5>
								</div>
								<div className="value">
									<h5 className="fw-300">£{Number(CheckOutData?.total).toFixed(2)}</h5>
								</div>
							</div>
							<div className="shipmentDelivery order-flex">
								<div className="property">
									<h5 className="fw-500">Shipment & Delivery:</h5>
								</div>
								<div className="value">
									<h5 className="fw-300">£0</h5>
								</div>
							</div>
							<div className="promoApplied order-flex">
								<div className="property">
									<h5 className="fw-500">Promo Applied:</h5>
								</div>
								<div className="value">
									<h5 className="fw-300">
										£
										{CheckOutData?.couponData?.discount
											? Number(CheckOutData?.couponData?.discount).toFixed(2)
											: "0"}
									</h5>
								</div>
							</div>
						</div>
						<div className="orderTotal">
							<div className="property">
								<h5 className="fw-700">Order Total</h5>
							</div>
							<div className="value">
								<h5 className="fw-400">
									£
									{CheckOutData?.total >=
									Number(CheckOutData?.couponData?.min_purchase).toFixed(2) ? (
										<>
											{`${CheckOutData?.total}` -
												`${CheckOutData?.couponData?.discount}`}
										</>
									) : (
										Number(CheckOutData?.total).toFixed(2) 
									)}
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default StepOne;
