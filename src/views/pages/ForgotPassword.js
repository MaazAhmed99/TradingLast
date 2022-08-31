import React, { useState } from "react";
import "../../assets/css/signin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Signinlogo from "../../assets/img/trading-logo.png";
import { useDispatch } from "react-redux";
import { SetResetPassword } from "../../redux/actions/AuthActions";
import { toast } from "react-toastify";
import queryString from "query-string";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const value = queryString.parse(location.search);
  const token = value.token;
  console.log("token", token);

  const NewPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!newPassword || !reNewPassword) {
      toast.error("Please Fill all fields");
      setLoading(false);
      return;
    }
    if (newPassword !== reNewPassword) {
      toast.error("Please Enter Same password and Confirm Password");
      setLoading(false);
      return;
    }
    let data = {
      password: newPassword,
      confirm_password: reNewPassword,
      reset_token: token,
    };
    console.log(data);
    setTimeout(async () => {
      let send = await dispatch(SetResetPassword(data, Navigate));
      setLoading(false);
        Navigate("/Signin");
    }, 600);
  };

  return (
    <>
      <section className="signin ">
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
              <p>New Password</p>
            </div>
            <form>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  value={reNewPassword}
                  onChange={(e) => setReNewPassword(e.target.value)}
                  className="form-control"
                  placeholder="Re-enter New Password"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={(e) => NewPasswordHandler(e)}
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

export default ForgotPassword;
