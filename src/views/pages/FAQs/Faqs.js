import React, { useState, useEffect } from "react";
import "../../../assets/css/contactus.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GetFaqs } from "../../../network/Network";
import { SpinnerCircular } from "spinners-react";

const Faqs = () => {
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [spinLoad, setSpinLoad] = useState(false);

  // Get fAQS
  useEffect(() => {
    setSpinLoad(true);
    GetFaqs()
      .then((res) => {
        console.log(res);
        setFaqData(res?.data?.data?.faqs);
        setSpinLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinLoad(false);
      });
  }, []);

  return (
    <>
      <Header />
      {/* <!-- Faqs Start Here --> */}
      <section className="Faqs">
        <div className="container">
          <div className="head">
            <h3>FAQs</h3>
            <h1>Some Useful information</h1>
          </div>
          <div className="row">
            {spinLoad ? (
              <>
                <div className="loader-container">
                  <SpinnerCircular size="80px" color="#8dc63e" />
                </div>
              </>
            ) : (
              <>
                {faqData?.map((item, index) => {
                  return (
                    <div className="col-md-6" key={item?.id}>
                      <div id="accordion">
                        <div className="card">
                          <div className="card-header" id={item?.id}>
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link"
                                data-toggle="collapse"
                                data-target={`#${item?.question}`}
                                aria-expanded="true"
                                aria-controls={item?.question}
                              >
                                <span>{item?.question}</span>
                                <i
                                  className="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </h5>
                          </div>

                          <div
                            id={item?.question}
                            className="collapse show"
                            aria-labelledby={item?.id}
                            data-parent="#accordion"
                          >
                            <div className="card-body">{item?.answer}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
      {/* <!-- Faqs End Here --> */}

      <Footer />
    </>
  );
};

export default Faqs;
