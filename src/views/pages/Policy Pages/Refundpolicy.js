import React, { useEffect, useState } from "react";
import "../../../assets/css/refundpolicy.css";
import { PageData } from "../../../network/Network";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SpinnerCircular } from "spinners-react";

const Refundpolicy = () => {
  const [refund, setRefund] = useState([]);
  const [privacy, setPrivacy] = useState([]);
  const [cookie, setCookie] = useState([]);
  const [terms, setTerms] = useState([]);
  const [spinLoad, setSpinLoad] = useState(false);

  useEffect(() => {
    setSpinLoad(true);
    let data = "Refund Policy";
    PageData(data)
      .then((res) => {
        console.log("page", res);
        setRefund(res?.data?.data?.pages);
        setSpinLoad(false);
        // dispatch(TopProductsApi(res?.data?.data?.topproducts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  return (
    <>
      <Header />

      <section className="refund">
        <div className="container">
          {spinLoad ? (
            <>
              <div className="loader-container">
                <SpinnerCircular size="80px" color="#8dc63e" />
              </div>
            </>
          ) : (
            <>
              <div className="head pt-5 pb-3">
                <h3 className="text-black font-30 fw-700">
                  {refund?.type === "refund_policy" ? "Refund Policy" : null}
                </h3>
              </div>
              <div className="content">
                <p dangerouslySetInnerHTML={{ __html: refund?.value }} />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Refundpolicy;
