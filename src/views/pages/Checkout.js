import React from "react";
import "../../assets/css/stepform.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import $ from "jquery";
import StepForm from "../components/StepForm/StepForm";

const Checkout = () => {
  let Naviagte = useNavigate();
  const Location = useLocation();
  console.log(Location);
  const CheckOutData = Location?.state?.data;
  return (
    <>
      <Header />
      <div className="container">
        <div className="card-stepForm">
          <StepForm CheckOutData={CheckOutData} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
