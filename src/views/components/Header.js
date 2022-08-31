import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/trading-logo.png";
import cartimg from "../../assets/img/cart.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/AuthActions";
import { ramdomImage } from "../../constant/ConstantFunction";
import { GetAds, GetProductsFilter } from "../../network/Network";
import { Adsapi } from "../../redux/actions/CartActions";
import imageProoo from "../../assets/img/profile-img.png"

const Header = (props) => {
  const { setChecked, checked } = props;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);
  const userData = useSelector((state) => state.AuthReducer.users);
  const CartReduxData = useSelector((state) => state.CartReducer.cartData);
  const CompanyInfoRedux = useSelector(
    (state) => state.AuthReducer.companyInfo,
  );
  const CategoriesRedux = useSelector(
    (state) => state.AuthReducer.categoriesData
  );
  const [loading, setLoading] = useState(false);
  const [adsData, setAdsData] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = () => {
    // console.log("collapse", collapse);
    setCollapse(!collapse);
  };

  const LogoutHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let x = await dispatch(logout());
      // Navigate("/Signin");
      window.location.href = "/Signin";
    }, 200);
  };

  useEffect(() => {
    GetProductsFilter(checked)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checked]);

  // console.log(adsData,'addddddddddzzzzzzzzzzzzzzzzzzzzzzzzz');

  // Get ads
  useEffect(() => {
    GetAds()
      .then((res) => {
        // console.log(res);
        setAdsData(res?.data?.data?.ads);
        dispatch(Adsapi(res?.data?.data?.ads));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let currentUrl = window.location.href.split("/");
  const [type, setType] = useState(currentUrl[3]);
  const [home, setHome] = useState(false);
  const [hot, setHot] = useState(false);
  const [products, setProducts] = useState(false);
  const [faq, setFaq] = useState(false);
  const [contact, setContact] = useState(false);
  const [delivery, setDelivery] = useState(false);

  // console.log("test", currentUrl);

  return (
    <>
      {/* <!-- Navbar home --> */}
      <div className="header-blue">
        <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
          <div className="container">
            <Link className="navbar-brand navbar-left" to="/">
              <img
                width="200"
                src={CompanyInfoRedux?.web_logo}
                target="_self"
                className="logo-width"
                alt=""
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleCollapse}
            // data-toggle="collapse"
            // data-target="#navbarNavDropdown"
            // aria-controls="navbarNavDropdown"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={"collapse navbar-collapse " + (collapse && "show")}
              id="navbarNavDropdown"
            >
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item" role="presentation">
                  <Link
                    to="/"
                    className={
                      currentUrl[3] === " " ? "active-nav active" : "nav-link"
                    }
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.5"
                      height="23.332"
                      viewBox="0 0 25.5 28.332"
                    >
                      <g
                        id="Group_4116"
                        data-name="Group 4116"
                        transform="translate(-517.7 -51.668)"
                      >
                        <g
                          id="bx-home-alt"
                          transform="translate(513.196 48.668)"
                        >
                          <path
                            id="Path_84"
                            data-name="Path 84"
                            d="M11.755,21.617a2.835,2.835,0,0,1,2.833-2.833h5.666a2.835,2.835,0,0,1,2.833,2.833V28.7h4.252l0-12.163L17.421,6.621,7.5,16.537V28.7h4.25Z"
                            transform="translate(-0.167 -0.201)"
                            fill="none"
                          />
                          <path
                            id="Path_85"
                            data-name="Path 85"
                            d="M15,22.5h5.666v7.083H15Z"
                            transform="translate(-0.584 -1.084)"
                            fill="none"
                          />
                          <path
                            id="Path_86"
                            data-name="Path 86"
                            d="M7.338,31.332H27.171A2.835,2.835,0,0,0,30,28.5V15.749a1.413,1.413,0,0,0-.416-1L18.255,3.416a1.415,1.415,0,0,0-2,0L4.92,14.748a1.413,1.413,0,0,0-.416,1V28.5a2.835,2.835,0,0,0,2.833,2.833ZM14.421,28.5V21.416h5.666V28.5ZM7.338,16.336,17.254,6.42l9.916,9.916V28.5H22.92V21.416a2.835,2.835,0,0,0-2.833-2.833H14.42a2.835,2.835,0,0,0-2.833,2.833V28.5H7.337V16.336Z"
                            transform="translate(0)"
                            fill="#8dc63f"
                          />
                        </g>
                      </g>
                    </svg>
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="/Hotdeals"
                    className={
                      currentUrl[3] === "Hotdeals"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.806"
                      height="25.335"
                      viewBox="0 0 18.806 27.335"
                    >
                      <g
                        id="Group_4115"
                        data-name="Group 4115"
                        transform="translate(1 2.061)"
                      >
                        <path
                          id="Icon_ionic-ios-flame"
                          data-name="Icon ionic-ios-flame"
                          d="M14.183,3.375c1.692,7.854-6.366,7.7-6.308,15.6.047,6.477,6.909,8.671,8.432,8.671a8.906,8.906,0,0,0,8.35-8.671C25.071,12.769,19.889,6.841,14.183,3.375Zm4.335,20.7a2.31,2.31,0,0,1-4.458.006,3.956,3.956,0,0,1-.14-1.021c0-2.392,2.369-5.152,2.369-5.152s2.357,2.76,2.357,5.152A3.671,3.671,0,0,1,18.518,24.072Z"
                          transform="translate(-7.875 -3.375)"
                          fill="none"
                          stroke="#d93b00"
                          strokeWidth="2"
                        />
                      </g>
                    </svg>
                    Hot Deals{" "}
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/allproducts"
                    className={
                      currentUrl[3] === "allproducts"
                        ? "nav-link dropdown-toggle active"
                        : "nav-link dropdown-toggle"
                    }
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Products <i className="fa fa-angle-down primary"></i>
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {CategoriesRedux?.map((item, index) => {
                      return (
                        <Link
                          to={`/Productspage/${item?.id}`}
                          className="dropdown-item"
                          key={item?.id}
                        >
                          <span onClick={() => setChecked(item?.id)}>
                            {item?.name}
                          </span>
                        </Link>
                      );
                    })}

                    {userData?.role === "Trader" ? (
                      <Link className="dropdown-item" to="/Traders">
                        Traders
                      </Link>
                    ) : null}
                  </div>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    className={
                      currentUrl[3] === "faqs" ? "nav-link  active" : "nav-link"
                    }
                    to="/faqs"
                  >
                    FAQ's
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="/Contact"
                    className={
                      currentUrl[3] === "Contact"
                        ? "nav-link  active"
                        : "nav-link"
                    }
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link
                    to="/Delivery"
                    className={
                      currentUrl[3] === "Delivery"
                        ? "nav-link  active"
                        : "nav-link"
                    }
                  >
                    Delivery Information
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item p-2" role="presentation">
                  {
                    CartReduxData?.length > 0 ? (
                      <Link to="/Product-cart">
                        {" "}
                        <div className="cart-num">{CartReduxData?.length}</div>
                        <img width="18px" src={cartimg} alt="" />
                      </Link>
                    ) : null
                  }
                </li>
                {isLogin ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        // to="/auth/profile"
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="profile-container">
                          {userData?.profile_url == null ? (
                            <>
                              <img
                                src={imageProoo}
                                className="image-width"
                                style={{ borderRadius: "50%" }}
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={`${userData?.profile_url}`}
                                alt=""
                                className="image-fluid image-width"
                              />
                            </>
                          )}
                        </div>
                      </a>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link className="dropdown-item" to="/auth/profile">
                          {userData?.f_name}
                        </Link>
                        <Link className="dropdown-item" to="/auth/myorders">
                          My Orders
                        </Link>
                        <Link className="dropdown-item" to="/auth/bookmark">
                          WishList
                        </Link>

                        <a className="dropdown-item">
                          <p
                            className="ml-2 header-role"
                            onClick={(e) => LogoutHandler(e)}
                            style={{ cursor: "pointer" }}
                          >
                            {loading ? "Loading.." : "Logout"}
                          </p>
                        </a>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item p-2" role="presentation">
                      <Link to="/Signin" className="btn btn-signup">
                        {" "}
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item p-2" role="presentation">
                      <Link to="/Signup" className="btn btn-signup">
                        {" "}
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* <!-- Navbar home close --> */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-light border-top border-bottom box-shadow-b">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="container">
            <ul className="navbar-nav mr-auto">
              {CategoriesRedux?.map((item, index) => {
                return (
                  <li className="nav-item" key={item?.id}>
                    <Link
                      to={`/Productspage/${item?.slug}`}
                      key={item?.id}
                      className={
                        currentUrl[4] === item?.slug
                          ? "nav-link font-10 active"
                          : "nav-link font-10"
                      }
                    >
                      <img src={item?.image_url} alt="" className="mr-2" />

                      {item?.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav> */}
      <Outlet />
    </>
  );
};

export default Header;
