import React, { useState } from "react";
import card1 from "../../../assets/img/card1.png";
import card2 from "../../../assets/img/card2.png";
import card3 from "../../../assets/img/card3.png";
import card4 from "../../../assets/img/card4.png";
import card5 from "../../../assets/img/card5.png";
import { loadStripe } from "@stripe/stripe-js";
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
const stripePromise = loadStripe(
	"pk_test_51LDNsIIXSseLhvkZqS3jYdzRjF32NH5UPVnZ1UD0WIfz6lEcNFBSVz9mS5TW3S0bsicnOfztLWPJYJDBa3CTuF1C00vWyczX1r",
);
//

const CheckoutForm = (props) => {
	const { StepTwoContinue, handleNext, setCardToken, cardToken } = props;
	const [formData, setFormData] = useState({});
	const [payProcessing, setPayProcessing] = useState(false);
	const [error, setError] = useState(false);
	const [done, setDone] = useState(false);

	const stripe = useStripe();
	const elements = useElements();
	const [paybutton, setPayButton] = useState(true);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (elements == null) {
			return;
		}
		const cardElement = elements.getElement(CardElement);
		const payload = await stripe.createToken(cardElement);
		setCardToken(payload?.token?.id);
		console.log("check", payload.token.id);
		if (payload?.token?.id) {
			handleNext(event);
			// StepTwoContinue(event);
			return;
		} else {
			toast.error("Something Went Wrong");
			return;
		}
		setPayProcessing(true);
		setDone(true);
		setPayProcessing(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{ hidePostalCode: true }}
					onChange={(e) => {
						if (e.complete) {
							setPayButton(false);
						} else {
							setPayButton(true);
						}
					}}
				/>
				<br />
				<div className="payment-cards">
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="exampleRadios"
							id="inlineradio1"
							defaultValue="option1"
						/>
						{/* <label className="form-check-label" htmlFor="inlineradio1">
							<figure>
								<img src={card1} alt="" />
							</figure>
						</label> */}
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="exampleRadios"
							id="inlineradio2"
							defaultValue="option2"
						/>
						{/* <label className="form-check-label" htmlFor="inlineradio2">
							<figure>
								<img src={card2} alt="" />
							</figure>
						</label> */}
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="exampleRadios"
							id="inlineradio3"
							defaultValue="option3"
						/>
						{/* <label className="form-check-label" htmlFor="inlineradio3">
							<figure>
								<img src={card3} alt="" />
							</figure>
						</label> */}
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="exampleRadios"
							id="inlineradio4"
							defaultValue="option4"
						/>
						{/* <label className="form-check-label" htmlFor="inlineradio4">
							<figure>
								<img src={card4} alt="" />
							</figure>
						</label> */}
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="exampleRadios"
							id="inlineradio5"
							defaultValue="option5"
						/>
						{/* <label className="form-check-label" htmlFor="inlineradio5">
							<figure>
								<img src={card5} alt="" />
							</figure>
						</label> */}
					</div>
				</div>
				<ul className="list-inline">
					<li>
						<button
							type="submit"
							className="default-btn next-step btn "
							disabled={!stripe || !elements || paybutton}
						>
							Continue to next step
						</button>
					</li>
				</ul>
			</form>
		</>
	);
};

const StripeForm = (props) => {
	const { StepTwoContinue, handleNext, setCardToken, cardToken } = props;
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm
				options={{ hidePostalCode: true }}
				StepTwoContinue={StepTwoContinue}
				handleNext={handleNext}
				setCardToken={setCardToken}
				cardToken={cardToken}
			/>
		</Elements>
	);
};

export default StripeForm;
