import React, { useState } from "react";
import "../../assets/css/deliveryinformation.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { OrderTracking } from "../../network/Network";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";

const Deliveryinformation = () => {
  const Token = useSelector((state) => state.AuthReducer.token);
  const [trackCode, setTrackCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinLoad, setSpinLoad] = useState(false);
  const [trackResponse, setTrackResponse] = useState([]);

  const SubmitTrack = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      setSpinLoad(true);
      if (!trackCode) {
        toast.error("Please enter Tracking id");
        setLoading(false);
        return;
      }
      OrderTracking(trackCode, Token)
        .then((res) => {
          console.log(res);
          setTrackResponse(res?.data?.data?.status);
          setSpinLoad(false);
          setLoading(false);
          toast.info(res?.data?.message);
        })
        .catch((err) => {
          console.log(err?.response?.data);
          toast.error(err?.response?.data?.message);
          setLoading(false);
          setSpinLoad(false);
        });
    }
  };

  return (
    <>
      <Header />
      <section className="information">
        <div className="container">
          <div className="head pb-5">
            <h2 className="font-50 fw-700 text-center">Delivery Information</h2>
          </div>
          <div className="track-your-order">
            <div className="inputField">
              <input
                type="text"
                className="effect-9"
                placeholder="Write Your Tracking Number"
                value={trackCode}
                onChange={(e) => {
                  setTrackCode(e.target.value);
                }}
                onKeyDown={SubmitTrack}
              />

            </div>
              {/* <button onClick={SubmitTrack} className="btn btn-primary bt-check-stts mb-4 border-0">Check Status</button> */}
          
            <div className="steps">
              {spinLoad ? (
                <>
                  <div className="loader-container">
                    <SpinnerCircular size="80px" color="#8dc63e" />
                  </div>
                </>
              ) : (
                <>
                  <ul className="tracking">
                    <li>
                      {trackResponse?.waiting_for_driver_assignment ? (
                        <i className="fa fa-check" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-circle" aria-hidden="true"></i>
                      )}
                      Waiting for Driver Assignment
                    </li>
                    <li>
                      {trackResponse?.order_picked_up_from_location ? (
                        <i className="fa fa-check" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-circle" aria-hidden="true"></i>
                      )}
                      Order Picked Up from location
                    </li>
                    <li>
                      {trackResponse?.order_on_way ? (
                        <i className="fa fa-check" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-circle" aria-hidden="true"></i>
                      )}
                      Order On Way
                    </li>
                    <li>
                      {trackResponse?.delivered ? (
                        <i className="fa fa-check" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-circle" aria-hidden="true"></i>
                      )}
                      Delivered
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Deliveryinformation;
