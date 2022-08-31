import React, { useEffect, useState } from "react";
import "../../../assets/css/refundpolicy.css";
import { PageData } from "../../../network/Network";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { SpinnerCircular } from "spinners-react";

const CookiePolicy = () => {
    const [refund, setRefund] = useState([]);
    const [privacy, setPrivacy] = useState([]);
    const [cookie, setCookie] = useState([]);
    const [terms, setTerms] = useState([]);
    const [spinLoad, setSpinLoad] = useState(false);

    useEffect(() => {
        setSpinLoad(true);
        let data = "Cookie Policy";
        PageData(data)
            .then((res) => {
                console.log("page", res);
                setCookie(res?.data?.data?.pages);
                setSpinLoad(false);
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
                                    {cookie?.type === "cookie_policy" ? "Cookie Policy" : null}
                                </h3>
                            </div>
                            <div className="content">
                                <p dangerouslySetInnerHTML={{ __html: cookie?.value }} />
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default CookiePolicy;
