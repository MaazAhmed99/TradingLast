import React from "react";
import card1 from "../../../assets/img/card1.png";
import card2 from "../../../assets/img/card2.png";
import card3 from "../../../assets/img/card3.png";
import card4 from "../../../assets/img/card4.png";
import card5 from "../../../assets/img/card5.png";
import StripeForm from "../Stripe/StripeForm";

function StepTwo(props) {
	const { StepTwoContinue, handleNext, CheckOutData, setCardToken, cardToken } =
		props;

	return (
		<>
			<h2 className="font-40 fw-600 text-center pb-5">Payment Details</h2>
			<div className="row">
				<div className="col-md-7">
					<div className="setpper-step-container">
						<div className="paymentInfo">
							<div className="head">
								<h4 className="font-20 fw-600">Enter Your Payment Details</h4>
							</div>
							<StripeForm
								StepTwoContinue={StepTwoContinue}
								handleNext={handleNext}
								setCardToken={setCardToken}
								cardToken={cardToken}
							/>
							<form>
								{/* <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Card Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name On Card"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Expire Date"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Expire Year"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div> */}

								{/* -- remaining -- */}
								{/* <div className="payment-cards">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="inlineradio1"
                      defaultValue="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineradio1">
                      <figure>
                        <img src={card1} alt="" />
                      </figure>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="inlineradio2"
                      defaultValue="option2"
                    />
                    <label className="form-check-label" htmlFor="inlineradio2">
                      <figure>
                        <img src={card2} alt="" />
                      </figure>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="inlineradio3"
                      defaultValue="option3"
                    />
                    <label className="form-check-label" htmlFor="inlineradio3">
                      <figure>
                        <img src={card3} alt="" />
                      </figure>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="inlineradio4"
                      defaultValue="option4"
                    />
                    <label className="form-check-label" htmlFor="inlineradio4">
                      <figure>
                        <img src={card4} alt="" />
                      </figure>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="inlineradio5"
                      defaultValue="option5"
                    />
                    <label className="form-check-label" htmlFor="inlineradio5">
                      <figure>
                        <img src={card5} alt="" />
                      </figure>
                    </label>
                  </div>
                </div>
                <ul className="list-inline">
                  <li>
                    <button
                      type="button"
                      className="default-btn next-step"
                      onClick={(e) => handleNext(e)}
                    >
                      Continue to next step
                    </button>
                  </li>
                </ul> */}
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
                £{" "}
									{CheckOutData?.total >=
									CheckOutData?.couponData?.min_purchase ? (
										<>
											{`${Number(CheckOutData?.total).toFixed(2)}` -
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

export default StepTwo;
