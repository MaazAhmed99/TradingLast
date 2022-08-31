import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { ApplyCoupons, PlaceOrder } from "../../../network/Network";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClearCart } from "../../../redux/actions/CartActions";

const steps = [
	"Select campaign settings",
	"Create an ad group",
	"Create an ad",
];

export default function StepForm(props) {
	const Navigate = useNavigate();
	const dispatch = useDispatch();
	const Token = useSelector((state) => state.AuthReducer.token);
	const userDataRedux = useSelector((state) => state.AuthReducer.users);
	const countryData = useSelector((state) => state.AuthReducer.country);
	console.log("country data", userDataRedux);
	const { CheckOutData } = props;
	const [firstName, setFirstName] = useState(userDataRedux?.f_name);
	const [lastName, setLastName] = useState(userDataRedux?.l_name);
	const [phone, setPhone] = useState(userDataRedux?.phone);
	const [email, setEmail] = useState(userDataRedux?.email);
	const [region, setRegion] = useState(undefined);
	const [postalCode, setPostalCode] = useState("");
	const [townCity, setTownCity] = useState(userDataRedux?.city);
	const [address, setAddress] = useState(userDataRedux?.street_address);
	const [cardToken, setCardToken] = useState("");
	const [loading, setLoading] = useState(false);

	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		Navigate("/Product-cart")
		
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const PlaceOrderHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		let userData = {
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			region: region,
			postalCode: postalCode,
			townCity: townCity,
			address: address,
		};
		let data = {
			cart: CheckOutData?.CartData,
			// discount: 0,
			customer_info: userData,
			stripe_token: cardToken,
			role: Token ? "trader" : "customer",
		};
		console.log(data);
		PlaceOrder(data, Token)
			.then((res) => {
				setLoading(false);
				console.log(res);
				dispatch(ClearCart());
				toast.success("Order placed successfully!");
				Navigate(`/thankyou`, { state: { data: res?.data?.data?.order } });
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const StepOneContinue = (e) => {
		e.preventDefault();
		setLoading(true);
		if (
			!firstName ||
			!lastName ||
			!phone ||
			!email ||
			!region ||
			// !postalCode ||
			!townCity ||
			!address
		) {
			toast.error("Please Enter All Field");
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
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
			setLoading(false);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
		setLoading(false);
	};

	const StepTwoContinue = (e) => {
		e.preventDefault();
		if (!cardToken) {
			// toast.error("Invalid Card Details");
			return;
		}
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					if (isStepOptional(index)) {
						labelProps.optional = <Typography variant="caption"></Typography>;
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{/* {label} */}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<React.Fragment>
					{/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleReset}>Reset</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
					{activeStep + 1 == 1 ? (
						<StepOne
							handleNext={handleNext}
							StepOneContinue={StepOneContinue}
							CheckOutData={CheckOutData}
							firstName={firstName}
							setFirstName={setFirstName}
							lastName={lastName}
							setLastName={setLastName}
							phone={phone}
							setPhone={setPhone}
							email={email}
							setEmail={setEmail}
							region={region}
							setRegion={setRegion}
							postalCode={postalCode}
							setPostalCode={setPostalCode}
							setTownCity={setTownCity}
							townCity={townCity}
							address={address}
							setAddress={setAddress}
							setLoading={setLoading}
							loading={loading}
							countryData={countryData}
						/>
					) : activeStep + 1 == 2 ? (
						<StepTwo
							StepTwoContinue={StepTwoContinue}
							handleNext={handleNext}
							CheckOutData={CheckOutData}
							setCardToken={setCardToken}
							cardToken={cardToken}
						/>
					) : (
						<StepThree
							CheckOutData={CheckOutData}
							PlaceOrderHandler={PlaceOrderHandler}
							phone={phone}
							address={address}
							region={region}
							townCity={townCity}
							setLoading={setLoading}
							loading={loading}
						/>
					)}

					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							color="inherit"
							onClick={handleBack}
							style={{cursor: "pointer"}}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						{/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

						{/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button> */}
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
