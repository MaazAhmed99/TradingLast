import React, { useEffect, useState } from "react";
import "../../assets/css/productdetail.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
import {
  AddWishList,
  GetSimilarProducts,
  PostProductRating,
  ProductDetails,
  SelectedProductReviews,
} from "../../network/Network";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddToCart, ProductAllReviews } from "../../redux/actions/CartActions";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import AllReviews from "../components/ReviewCard/AllReviews";
import { Rating } from "react-simple-star-rating";
import ProductImagesSlider from "../components/ProductDetailSlider/ProductImagesSlider";
import ReactPaginate from "react-paginate";
import { SpinnerCircular } from "spinners-react";

const Productdetail = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Token = useSelector((state) => state.AuthReducer.token);
  const UserDataRedux = useSelector((state) => state.AuthReducer.users);
  const SocialLinks = useSelector((state) => state.AuthReducer.socialMedia);
  const allStates = useSelector((state) => state.CartReducer.cartData);
  const ReviewsDataRedux = useSelector((state) => state.CartReducer.reviewData);
  let currentUrl = window.location.href.split("/");
  console.log(currentUrl[4])
  const [wishLoading, setWishLoading] = useState(false);
  const [productReview, setProductReview] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");

  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [similarData, setSimilarData] = useState([]);
  const [paramData, setParamData] = useState(null);
  const location = useLocation();
  // console.log(location?.state?.data);
  // const ParamData = location?.state?.data;

  console.log(similarData, 'pppppppppppppppppppppppppp');


  const handlePageClick = async (data) => {
    console.log(data.selected);
    setCurrentPage(data?.selected + 1);
  };




  useEffect(() => {
    SelectedProductReviews(paramData?.id, currentPage)
      .then((res) => {
        console.log(res);
        setProductReview(res?.data?.data?.data);
        dispatch(ProductAllReviews(res?.data?.data?.data));
        const total = res?.data?.data?.total;
        const limit = res?.data?.data?.per_page;
        setPageCount(Math.ceil(total / limit));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ProductAllReviews, currentPage]);


  useEffect(() => {
    ProductDetails(currentUrl[4])
      .then((res) => {
        console.log(res)
        setParamData(res?.data?.data?.product);
        GetSimlrProd(res?.data?.data?.product?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUrl[4]])


  const GetSimlrProd = (e) => {
    GetSimilarProducts(e)
      .then((res) => {
        console.log("similarzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", res);
        setSimilarData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    console.log("paramData");
  }, [])

  const AddWishListHandler = (e) => {
    e.preventDefault();
    setWishLoading(true);
    let data = {
      product_id: paramData?.id,
    };
    console.log(data);
    AddWishList(data, Token)
      .then((res) => {
        setWishLoading(false);
        console.log(res);
        toast.success("Product Add to your Wishlist");
      })
      .catch((err) => {
        setWishLoading(false);
        console.log(err?.response);
        toast.error(err?.response?.data?.message);
      });
  };

  const AddToCartHandler = (item) => {
    let checkItemAlreadyExist = allStates.filter((val) => val?.id === item?.id);
    if (checkItemAlreadyExist.length > 0) {
      alert("Item Already Exist in Cart!!!");
    } else {
      let colorData = JSON.parse(paramData?.colors);
      let data = {
        id: item?.id,
        price: item?.unit_price,
        quantity: 1,
        color: color ? color : colorData,
        productitem: item,
      };
      dispatch(AddToCart(data));
      Navigate("/Product-cart");
    }
  };

  const handleRating = (rate) => {
    if (rate === "20") {
      setRating(1);
    } else if (rate === "40") {
      setRating(2);
    } else if (rate === "60") {
      setRating(3);
    } else if (rate === "80") {
      setRating(4);
    } else {
      setRating(5);
    }
  };

  const SubmitRating = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!rating || !comment) {
      toast.error("Please Enter All Fields");
      setLoading(false);
      return;
    }
    let data = {
      product_id: paramData?.id,
      comment: comment,
      rating: rating,
    };
    PostProductRating(data, Token)
      .then((res) => {
        setLoading(false);
        console.log("rrrv", res);
        dispatch(ProductAllReviews(res?.data?.data));
        toast.success("Successfully send");
        setRating("");
        setComment("");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message === "Unauthenticated.") {
          toast.error("Please Login");
        }
        setRating("");
        setComment("");
      });
  };

  console.log(paramData);
  // console.log(JSON.parse(ParamData?.category_ids));
  console.log(color);


  if (paramData == null) {
    return (
      <div className="loader-container">
        <SpinnerCircular size="80px" color="#8dc63e" />
      </div>
    )
  }

  return (
    <>
      <Header />

      <section className="productdetail">
        <div className="container">
          <div className="breadcrumbs">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product Page
                </li>
              </ol>
            </nav>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* <ProductImagesSlider ParamData={JSON.parse(paramData?.images) || []} /> */}
              <figure>
                <img
                  src={`${paramData?.thumbnail_url}`}
                  alt=""
                  className="image-fluid image-width"
                />
              </figure>
              {/* <div className="imgBox">
                <figure>
                  <img
                    src={`${ParamData?.thumbnail_url}`}
                    alt=""
                    className="image-fluid image-width"
                  />
                </figure>
              </div>
              <div className="productsimages">
                <ul className="images">
                  {JSON.parse(ParamData?.images).map((item, index) => {
                    console.log(item);
                    return (
                      <li className="product-images">
                        <figure>
                          <img
                            src={`${ImageUrl}/${item}`}
                            alt=""
                            className="image-fluid image-width"
                          />
                        </figure>
                      </li>
                    );
                  })}
                </ul>
              </div> */}
            </div>
            <div className="col-md-6">
              {/* <div className="category">
                <h5 className="font-15 fw-400">
                  {console.log(JSON.parse(ParamData?.category_ids))}
                </h5>
              </div> */}

              <div className="info">
                <div className="name">
                  <h3 className="font-30 fw-700">{paramData?.name}</h3>
                </div>
                <div className="price">

                  {(paramData?.after_discount_price > 0) ? <h3 className="font-30 fw-700">£{paramData?.after_discount_price}</h3> : <h3 className="font-30 fw-700">£{paramData?.unit_price}</h3>}
                  {/* <h3 className="font-30 fw-700">£{paramData?.unit_price}</h3> */}
                </div>
              </div>

              <div className="reviews">
                <div className="stars">
                  <div className="rating-inner-cont mt-3 mb-3">
                    {paramData?.rating?.map((item, index) => {
                      return (
                        <Rating
                          size={28}
                          readonly={true}
                          ratingValue={
                            Math.round(item?.average) === 1
                              ? "20"
                              : Math.round(item?.average) === 2
                                ? "40"
                                : Math.round(item?.average) === 3
                                  ? "60"
                                  : Math.round(item?.average) === 4
                                    ? "80"
                                    : Math.round(item?.average) === 5
                                      ? "100"
                                      : null
                          }
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="clentreviews">
                  <h5 className="font-15 fw-400">{paramData?.average}</h5>
                </div>
              </div>

              <div className="description">
                <h4 className="font-20 fw-500">Discription</h4>
                <p
                  className="fw-400"
                  dangerouslySetInnerHTML={{ __html: paramData?.details }}
                />
              </div>

              <div className="variations">
                <div className="quantity">
                  {UserDataRedux?.role === "Trader" ? (
                    <>
                      <label htmlFor="qty">
                        quantity:
                        {/* trade_qty */}
                        {paramData?.current_stock}
                      </label>
                    </>
                  ) : (
                    <>
                      <label htmlFor="qty">Qty:{" "}{paramData?.current_stock}</label>
                    </>
                  )}
                </div>
                <div className="spacer"></div>
                <div className="quantity">
                  {(JSON.parse(paramData?.colors) && JSON.parse(paramData?.colors).length > 0) ? (
                    <label htmlFor="qty">Color:</label>
                  ) : null}

                  {JSON.parse(paramData?.colors).map((item, index) => {
                    return (
                      <div className="colors">
                        <div
                          className={`${color === item ? "selectColor colorBox" : "colorBox"
                            }`}
                          style={{ backgroundColor: `${item}` }}
                          onClick={() => setColor(item)}
                        ></div>
                      </div>
                    );
                  })}

                  {/* <span
                      className="colorselect"
                      style={{
                        background: "#173EF4",
                        width: "65px",
                        height: "35px",
                      }}
                    ></span> */}
                  {/* <div className="arrows">
                      <div className="top">
                        <i className="fa fa-angle-up" aria-hidden="true"></i>
                      </div>
                      <div className="bottom">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </div>
                    </div> */}
                </div>
              </div>

              <div className="buttons">
                <button
                  className="cart"
                  onClick={() => AddToCartHandler(paramData)}
                >
                  Add To Cart
                  <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                </button>
                <button
                  className="wishlist"
                  onClick={(e) => AddWishListHandler(e)}
                  disabled={wishLoading}
                >
                  {wishLoading ? "Loading.." : "Wishlist"}{" "}
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                </button>
              </div>

              <div className="share-btn">
                <label>Share :</label>
                <ul className="social-icons">
                  {SocialLinks?.map((item, index) => {
                    return (
                      <li key={item?.id}>
                        <a href={`${item?.link}`} target="_blank">
                          <i className={item?.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AllReviews
        ReviewsDataRedux={ReviewsDataRedux}
        productReview={productReview}
        setProductReview={setProductReview}
        ParamData={paramData}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      />

      <ReviewCard
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
        handleRating={handleRating}
        SubmitRating={SubmitRating}
        loading={loading}
      />

      <section className="similar_products">
        <div className="container">
          <div className="topBar">
            <div className="heading">
              <h2 className="font-60">Similar Products</h2>
            </div>
            {/* <div className="view-btn">
              <a href="#">View All</a>
            </div> */}
          </div>
          <div className="row">
            {similarData?.slice(0, 4)?.map((itemz, iz) => {

              return (
                <div className="col-md-3 pt-2 my-4" key={iz}>
                  <Products item={itemz} />
                </div>
              )
            })
            }
            {/* {similarData?.slice(0, 4)?.map((item, index) =>
              
            )} */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Productdetail;
