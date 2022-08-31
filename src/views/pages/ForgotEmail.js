import React, { useState } from "react";
import "../../assets/css/signin.css";
import { Link, useNavigate } from "react-router-dom";
import Signinlogo from "../../assets/img/trading-logo.png";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/AuthActions";
import { toast } from "react-toastify";

const ForgotEmail = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const ForgetPasswordHandler = async (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("please enter correct email");
      setLoading(false);
      return;
    } else {
      let data = { email: email };
      console.log(data);
      setTimeout(async () => {
        setLoading(false);
        let send = await dispatch(forgotPassword(data));
        // Navigate("/newpassword");
        // window.location.href = "/newpassword";
      }, 600);
    }
  };

  return (
    <>
      <section className="signin ovrflw-frgtpass">
        <div className="container">
          <div className="logoDv">
            <figure>
              <Link to="/">
                <img src={Signinlogo} alt="" />
              </Link>
            </figure>
          </div>
          <div className="SigninBox">
            <div className="head">
              <h4>Welcome Back to Trading Centre LTD</h4>
              <h4>
                <strong>Where we provide Best Products</strong>
              </h4>
            </div>
            <div className="actionBtn">
              <p>Forgot Password</p>
            </div>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => ForgetPasswordHandler(e)}
                disabled={loading}
              >
                {loading ? "Loading.." : "Submit"}
              </button>
            </form>
            <div className="actionBtn2">
              <p>
                By Creating Account you are agree to our{" "}
                <Link to="/termcondition">Terms & conditions</Link>
              </p>
              <p>
                <Link to="/">Back To Home</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotEmail;
