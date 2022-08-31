import React from "react";
import "../../assets/css/thankyou.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";

const Thankyou = () => {
  const Location = useLocation();
  console.log(Location?.state);
  return (
    <>
      <Header />
      <section className="thankyou">
        <div className="container">
          <div className="happyShopping">
            <h3 className="font-30 fw-600 pb-4">Thank you for Shopping</h3>
            <p className="pb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>Order Id: {Location?.state?.data?.id}</p>
            <p>Amount: {Location?.state?.data?.order_amount}</p>
            <p>Status: {Location?.state?.data?.order_status}</p>
            <div className="button-group">
              <Link to="/" className="btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Thankyou;
