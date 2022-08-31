import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import pro1 from "../../assets/img/i-1.jpg";
import pro2 from "../../assets/img/pr-1.jpg";
import pro3 from "../../assets/img/pr-2.jpg";
import pro4 from "../../assets/img/pr-3.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Products from "../components/Products";
import {
  GetHomeBanner,
  GetTradingProducts,
  SearchProducts,
} from "../../network/Network";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Traders = () => {
  const AdsData = useSelector((state) => state.CartReducer.ads);
  const TopProductsRedux = useSelector(
    (state) => state?.CartReducer?.topProducts
  );
  const [tradingData, setTradingData] = useState([]);
  const [productsSearch, setProductsSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchSpinLoad, setSearchSpinLoad] = useState(false);
  const [tradingSpinLoad, setTradingSpinLoad] = useState(false);
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [productImages, setProductImages] = useState([]);
  const [bannerData, setBannerData] = useState([]);

  const BannerSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const regularSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const productDetail = [
    {
      id: 1,
      badge: "20% off",
      img: pro2,
      name: "By Lorem",
      description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
      saleprice: "$158.07",
      regprice: "$192.07",
    },
    {
      id: 2,
      badge: "20% off",
      img: pro3,
      name: "By Lorem",
      description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
      saleprice: "$158.07",
      regprice: "$192.07",
    },
    {
      id: 3,
      badge: "20% off",
      img: pro4,
      name: "By Lorem",
      description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
      saleprice: "$158.07",
      regprice: "$192.07",
    },
    {
      id: 4,
      badge: "20% off",
      img: pro1,
      name: "By Lorem",
      description: "Lorem ipsum dolor sit amet, conse adipiscing elit",
      saleprice: "$158.07",
      regprice: "$192.07",
    },
  ];
  const handlePageClick = async (data) => {
    console.log(data?.selected);
    setCurrentPage(data?.selected + 1);
  };

  // Get Trading Products
  useEffect(() => {
    setTradingSpinLoad(true);
    GetTradingProducts(currentPage)
      .then((res) => {
        console.log(res);
        setTradingData(res?.data?.data?.products?.data);
        setProductImages(res?.data?.data?.products?.data);
        setTradingSpinLoad(false);
        const total = res?.data?.data?.products?.total;
        const limit = res?.data?.data?.products?.per_page;
        setPageCount(Math.ceil(total / limit));
        // dispatch(HotDealsData(res?.data?.data?.products?.data));
      })
      .catch((err) => {
        console.log(err);
        setTradingSpinLoad(false);
      });
  }, [currentPage]);

  const SubmitSearch = (event) => {
    if (event?.key === "Enter") {
      event.preventDefault();
      setSearchSpinLoad(true);
      if (!productsSearch) {
        toast.error("Please enter Product Name");
        setSearchSpinLoad(false);
        return;
      }
      SearchProducts(productsSearch)
        .then((res) => {
          console.log(res);
          setSearchData(res?.data?.data?.products?.data);
          setSearchSpinLoad(false);
        })
        .catch((err) => {
          console.log(err?.response?.data);
          toast.error(err?.response?.data?.message);
          setSearchSpinLoad(false);
        });
    }
  };

  // Banner
  useEffect(() => {
    let data = {
      type: "all",
    };
    GetHomeBanner(data)
      .then((res) => {
        console.log("banner", res);
        let arr = [];
        for (let i = 0; i < res?.data?.length; i++) {
          if (res?.data?.[i].banner_type === "trader") arr.push(res?.data?.[i]);
        }
        setBannerData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(tradingData);

  return (
    <>
      <Header />
      <section className="Home-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="home-banner fullwidth">
                <Slider {...BannerSlider}>
                  {bannerData?.map((item, index) => {
                    return (
                      <>
                        {item?.banner_type === "trader" ? (
                          <li className="slide" key={index}>
                            <Link to="">
                              <div className="container">
                                <div className="slide__text row">
                                  <div className="col-md-10">
                                    <div className="d-flex pb-2">
                                      <h5 className="sub-heading pr-3 fw-500 pt-3 font-30 text-white">
                                        {item?.title}{" "}
                                      </h5>
                                    </div>
                                    <h3 className="fw-600 font-60 subtitle text-blue">
                                      {item?.sub_title}
                                    </h3>

                                    <p className="text-white">
                                      {item?.description}
                                    </p>

                                    <div className="searchBox">
                                      <input
                                        type="text"
                                        placeholder="Search Product"
                                        value={productsSearch}
                                        onChange={(e) =>
                                          setProductsSearch(e.target.value)
                                        }
                                        onKeyDown={SubmitSearch}
                                      />
                                      <button onClick={(e) => SubmitSearch(e)}>
                                        <i
                                          className="fa fa-search"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide__image">
                                <img
                                  src={`${item?.banner_image_url}`}
                                  alt=""
                                  className="image-fluid"
                                />
                              </div>
                            </Link>
                          </li>
                        ) : null}
                      </>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {searchSpinLoad ? (
          <>
            <div className="loader-container">
              <SpinnerCircular size="80px" color="8dc63e" />
            </div>
          </>
        ) : (
          <div className="row mb-5">
            {searchData?.map((item, index) => (
              <div className="col-lg-3 col-md-6 pt-2 my-4" key={index}>
                <Products item={item} index={index} page={"trader"} />
              </div>
            ))}
          </div>
        )}

        <div className="row pb-4">
          <div className="col-md-6">
            <h5 className="sub-heading fw-500 font-20">Best Sellers Deals</h5>
          </div>
          <div className="col-md-6  text-right ">
            <a href="#" className="btn btn-view">
              View All
            </a>
          </div>
        </div>
        <div className="regular">
          <Slider {...regularSlider}>
            {TopProductsRedux?.map((item, index) => (
              <Cards key={index} item={item} />
            ))}
          </Slider>
        </div>
      </div>

      <div className="container">
        {tradingSpinLoad ? (
          <>
            <div className="loader-container">
              <SpinnerCircular size="80px" color="#8dc63e" />
            </div>
          </>
        ) : (
          <div className="row mt-5 mb-5">
            {tradingData?.map((item, index) => (
              <div className="col-lg-3 col-md-6 pt-2 my-4" key={index}>
                <Products item={item} index={index} />
              </div>
            ))}
          </div>
        )}
        <div className="pagination-container mt-5">
          <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>

      <div className="container banners-img">
        <div className="head">
          <h2>Browse through Our Latest Deals</h2>
        </div>
        <div className="row justify-content-center align-middle align-items-center">
          <div className="col-md-6 pt-2 no-pad-right">
            <div className="box">
              <img
                src={AdsData[2]?.image_url}
                className="img-fluid"
                alt=""
                style={{ width: "100%", height: "342px" }}
              />
              <div className="bottom-left">
                <Link
                  to={AdsData[2]?.url}
                  className="btnbl text-white font-12"
                  tabIndex="-1"
                >
                  {AdsData[2]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_4119"
                      data-name="Group 4119"
                      transform="translate(-336 -1971)"
                    >
                      <g
                        id="Group_47"
                        data-name="Group 47"
                        transform="translate(-5 2)"
                      >
                        <g
                          id="Ellipse_5"
                          data-name="Ellipse 5"
                          transform="translate(341 1969)"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1"
                        >
                          <circle cx="15" cy="15" r="15" stroke="none" />
                          <circle cx="15" cy="15" r="14.5" fill="none" />
                        </g>
                        <path
                          id="Icon_awesome-arrow-right"
                          data-name="Icon awesome-arrow-right"
                          d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                          transform="translate(358.94 1977.355)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>

              <div className="m-centered">
                <p className="text-white line-height-1">{AdsData[2]?.title}</p>
                <h2 className="text-white line-height-1 font-20">
                  {AdsData[2]?.sub_title}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-2 no-pad-left">
            <div className="box">
              <img
                src={AdsData[3]?.image_url}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "342px" }}
              />
              <div className="bottom-left">
                <a href="#" className="btnbl text-black font-12" tabIndex="-1">
                  {AdsData[3]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_47"
                      data-name="Group 47"
                      transform="translate(-341 -1969)"
                    >
                      <g
                        id="Ellipse_5"
                        data-name="Ellipse 5"
                        transform="translate(341 1969)"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1"
                      >
                        <circle cx="15" cy="15" r="15" stroke="none" />
                        <circle cx="15" cy="15" r="14.5" fill="none" />
                      </g>
                      <path
                        id="Icon_awesome-arrow-right"
                        data-name="Icon awesome-arrow-right"
                        d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                        transform="translate(358.94 1977.355)"
                      />
                    </g>
                  </svg>
                </a>
              </div>
              <div className="m-centered">
                <p className="line-height-1"> {AdsData[3]?.title}</p>
                <h2 className="line-height-1 font-20">
                  {" "}
                  {AdsData[3]?.sub_title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mt-3 large-box"
        style={{ backgroundImage: `url('${AdsData[4]?.image_url}')` }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="pl-4">
              <p className="font-20">Get Different Price On</p>
              <h2> {AdsData[4]?.title}</h2>
              <p className="font-20"> {AdsData[4]?.sub_title}</p>
              <div className="pt-5">
                <Link
                  to={AdsData[4]?.url}
                  className="btnbl text-black font-12"
                  tabIndex="-1"
                >
                  {AdsData[4]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_47"
                      data-name="Group 47"
                      transform="translate(-341 -1969)"
                    >
                      <g
                        id="Ellipse_5"
                        data-name="Ellipse 5"
                        transform="translate(341 1969)"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1"
                      >
                        <circle cx="15" cy="15" r="15" stroke="none"></circle>
                        <circle cx="15" cy="15" r="14.5" fill="none"></circle>
                      </g>
                      <path
                        id="Icon_awesome-arrow-right"
                        data-name="Icon awesome-arrow-right"
                        d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                        transform="translate(358.94 1977.355)"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container Threebanners">
        <div className="row justify-content-center align-middle align-items-center">
          <div className="col-md-4 pt-2  no-pad-right pl-0 my-4">
            <div className="box">
              <img
                src={AdsData[5]?.image_url}
                className="img-fluid"
                alt=""
                style={{ width: "100%", height: "342px" }}
              />

              <div className="m-centered">
                <p className="line-height-1"> {AdsData[5]?.title}</p>
                <h2 className="line-height-1 font-30 text-black">
                  {" "}
                  {AdsData[5]?.sub_title}
                </h2>
                <Link
                  to={AdsData[5]?.url}
                  className="btnbl text-black font-12"
                  tabIndex="-1"
                >
                  {AdsData[5]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_4119"
                      data-name="Group 4119"
                      transform="translate(-336 -1971)"
                    >
                      <g
                        id="Group_47"
                        data-name="Group 47"
                        transform="translate(-5 2)"
                      >
                        <g
                          id="Ellipse_5"
                          data-name="Ellipse 5"
                          transform="translate(341 1969)"
                          fill="none"
                          stroke="#000"
                          strokeWidth="1"
                        >
                          <circle cx="15" cy="15" r="15" stroke="none" />
                          <circle cx="15" cy="15" r="14.5" fill="none" />
                        </g>
                        <path
                          id="Icon_awesome-arrow-right"
                          data-name="Icon awesome-arrow-right"
                          d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                          transform="translate(358.94 1977.355)"
                          fill="#000"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-2 no-pad-right pl-0 my-4">
            <div className="box">
              <img
                src={AdsData[6]?.image_url}
                className="img-fluid"
                alt=""
                style={{ width: "100%", height: "342px" }}
              />

              <div className="m-centered">
                <p className="line-height-1">{AdsData[6]?.title}</p>
                <h2 className="line-height-1 font-30 text-black">
                  {AdsData[6]?.sub_title}
                </h2>
                <Link
                  to={AdsData[6]?.url}
                  className="btnbl text-black font-12"
                  tabIndex="-1"
                >
                  {AdsData[6]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_4119"
                      data-name="Group 4119"
                      transform="translate(-336 -1971)"
                    >
                      <g
                        id="Group_47"
                        data-name="Group 47"
                        transform="translate(-5 2)"
                      >
                        <g
                          id="Ellipse_5"
                          data-name="Ellipse 5"
                          transform="translate(341 1969)"
                          fill="none"
                          stroke="#000"
                          strokeWidth="1"
                        >
                          <circle cx="15" cy="15" r="15" stroke="none" />
                          <circle cx="15" cy="15" r="14.5" fill="none" />
                        </g>
                        <path
                          id="Icon_awesome-arrow-right"
                          data-name="Icon awesome-arrow-right"
                          d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                          transform="translate(358.94 1977.355)"
                          fill="#000"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-2 no-pad-left my-4">
            <div className="box">
              <img
                src={AdsData[7]?.image_url}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "342px" }}
              />

              <div className="m-centered">
                <p className="text-white line-height-1"> {AdsData[7]?.title}</p>
                <h2 className="text-white line-height-1 font-30">
                  {" "}
                  {AdsData[7]?.sub_title}
                </h2>
                <Link
                  to={AdsData[7]?.url}
                  className="btnbl text-white font-12"
                  tabIndex="-1"
                >
                  {AdsData[7]?.button_name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <g
                      id="Group_4119"
                      data-name="Group 4119"
                      transform="translate(-336 -1971)"
                    >
                      <g
                        id="Group_47"
                        data-name="Group 47"
                        transform="translate(-5 2)"
                      >
                        <g
                          id="Ellipse_5"
                          data-name="Ellipse 5"
                          transform="translate(341 1969)"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1"
                        >
                          <circle cx="15" cy="15" r="15" stroke="none" />
                          <circle cx="15" cy="15" r="14.5" fill="none" />
                        </g>
                        <path
                          id="Icon_awesome-arrow-right"
                          data-name="Icon awesome-arrow-right"
                          d="M.187,3.154l.385-.385a.414.414,0,0,1,.587,0L4.527,6.136a.414.414,0,0,1,0,.587L1.159,10.091a.414.414,0,0,1-.587,0L.187,9.706a.416.416,0,0,1,.007-.594L2.281,7.123H-9.584A.415.415,0,0,1-10,6.707V6.153a.415.415,0,0,1,.416-.416H2.281L.194,3.748A.413.413,0,0,1,.187,3.154Z"
                          transform="translate(358.94 1977.355)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hottest-de">
        <div className="container ">
          <img src="img/img-left-1.png" className="img-left-1 pt-5" alt="" />
          <div className="row pb-3">
            <div className="col-md-6">
              <h2 className="font-26 fw-700 text-green">Hottest Deals</h2>
            </div>
            <div className="col-md-6 text-right">
              <a href="#" className="btn-underline">
                View All
              </a>
            </div>
          </div>
          <div className="row">
            {tradingData?.map((item, index) => (
              <div className="col-lg-3 col-md-6 pt-2 my-4" key={index}>
                <Products item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Traders;
