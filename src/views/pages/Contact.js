import React, { useState, useEffect } from "react";
import Emailimg from "../../assets/img/email.png";
import Phoneimg from "../../assets/img/phone.png";
import Supportimg from "../../assets/img/support.png";
import "../../assets/css/contactus.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { PostContactUs } from "../../network/Network";
import { useSelector } from "react-redux";

const Contact = () => {
  const Token = useSelector((state) => state.AuthReducer.token);
  const CompanyInfoRedux = useSelector(
    (state) => state.AuthReducer.companyInfo
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ContactUsHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !number || !subject || !message) {
      toast.error("Please Enter All Fields");
      setLoading(false);
      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid Email");
      setLoading(false);
      return;
    }
    if (message.length < 20) {
      toast.error("The message must be at least 20 characters");
      setLoading(false);
      return;
    }
    let data = {
      name: name,
      email: email,
      mobile_number: number,
      subject: subject,
      message: message,
    };
    console.log(data);
    PostContactUs(data, Token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success("Successfully send");
        setName("");
        setEmail("");
        setNumber("");
        setSubject("");
        setMessage("");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <section className="Conversationform">
        <div className="container">
          <div className="heading">
            <h1>Let’s Start a Conversation</h1>
            <p>
              Browse our collection of recipes to help inspire healthy cooking
              in the week. Filter by dietary preference and add your favourite
              meals to your weekly meal planning diary to help with grocery
              shopping and organisation in the week.
            </p>
          </div>
          <form onSubmit={(e) => ContactUsHandler(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Your name*</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contact email*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                  required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number*</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                    value={number}
                  required
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Subject*</label>
                  <input
                    type="Subject"
                    className="form-control"
                    placeholder="Subject"
                  required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                  <label>Company name*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Company name"

                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Country*</label>
                  <br />
                  <select className="form-control">
                    <option>Indonesia</option>
                    <option>Malaysia</option>
                    <option>Japan</option>
                  </select>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Your message*</label>
                  <br />
                  <textarea
                    className="form-control"
                    placeholder="Type your message…."
                    value={message}
                  required
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    By submitting this form you agree to our terms and
                    conditions and our Privacy Policy which explains how we may
                    collect, use and disclose your personal information
                    including to third parties.
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <button type="submit" >
                    {loading ? "Loading.." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* <!-- Info Section Start Here --> */}
      <section className="infoSec text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="email-box info-box">
                <div className="img-box">
                  <figure>
                    <img src={Emailimg} alt="" />
                  </figure>
                </div>
                <div className="contentDv">
                  <h4>Email us</h4>
                  <p>
                    Email us for general queries, including marketing and
                    partnership opportunities.
                  </p>
                  <a href={`mailto:${CompanyInfoRedux?.email?.value}`}>
                    {CompanyInfoRedux?.email?.value}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="call-box info-box">
                <div className="img-box">
                  <figure>
                    <img src={Phoneimg} alt="" />
                  </figure>
                </div>
                <div className="contentDv">
                  <h4>Call us</h4>
                  <p>
                    Call us to speak to a member of our team. We are always
                    happy to help.
                  </p>
                  <a href={`tel:${CompanyInfoRedux?.phone?.value}`}>
                    {CompanyInfoRedux?.phone?.value}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="support-box info-box">
                <div className="img-box">
                  <figure>
                    <img src={Supportimg} alt="" />
                  </figure>
                </div>
                <div className="contentDv">
                  <h4>Support</h4>
                  <p>Check out helpful resources, FAQs and developer tools.</p>
                  <a href="#">Support Center</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Info Section Start Here --> */}

      <Footer />
    </>
  );
};

export default Contact;
