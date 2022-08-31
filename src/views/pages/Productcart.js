import React, { useState, useEffect } from "react";
import "../../assets/css/productcart.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import CartList from "../components/Cart/CartList";
import {
  ClearCart,
  DecrementProductQuantity,
  deleteCartItem,
  IncrementProductQuantity,
} from "../../redux/actions/CartActions";
import { ApplyCoupons } from "../../network/Network";
import { toast } from "react-toastify";

const Productcart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CartData = useSelector((state) => state.CartReducer.cartData);
  const Token = useSelector((state) => state.AuthReducer.token);
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);
  console.log(CartData);
  const [subTotal, setSubTotal] = useState(0);
  const [coupons, setCoupons] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [cartData, setCartData] = useState([CartData]);
  const [quantity, setQuantity] = useState(1);

  const TotalAmount = () => {
    let i;
    let total = 0;
    for (i = 0; i < CartData.length; i++) {
      console.log("cart", CartData[i]?.price);
      total = total + CartData[i]?.price * CartData[i]?.quantity;
    }
    setSubTotal(total);
  };
  console.log(CartData);

  useEffect(() => {
    TotalAmount();
  }, [CartData]);

  useEffect(() => {
    if (CartData.length === 0) {
      navigate("/");
    }
  }, [CartData]);

  const ApplyCouponsHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(coupons);
    ApplyCoupons(coupons)
      .then((res) => {
        setLoading(false);
        console.log(res);
        setCouponData(res?.data?.data?.coupon);
        toast.success("Successfully Apply");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
  };

  const RemoveCartItem = (id) => {
    const items = cartData;
    let currentItem = id;
    if (items.length > 0) {
      setCartData(
        items.filter((item, index) => item?.productitem?.id !== currentItem)
      );
      dispatch(deleteCartItem(currentItem));
      //   setPostList(items.filter((item, index) => index !== currentItem));
    }
  };

  const Increment = (id) => {
    console.log(id, 'jaaaaaaaaz');
    dispatch(IncrementProductQuantity(id));
  };
  const Decrement = (id) => {
    console.log(id, 'jaaaaaaaaz');
    dispatch(DecrementProductQuantity(id));
  };

  // console.log(couponData);

  return (
    <>
      <Header />
      <section className="productCart">
        <div className="container">
          <div className="heading">
            <h3 className="text-center title font-40 fw-600">Product Cart</h3>
          </div>
          <div className="tableDv">
            <table>
              <thead>
                <tr className="topbar">
                  <th className="productDetail">PRODUCT NAME</th>
                  <th className="Proprice">UNIT PRICE</th>
                  <th className="qty">QUANTITY</th>
                  <th className="addcart">SUB TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {CartData?.map((item, index) => {
                  return (
                    <CartList
                      item={item}
                      index={index}
                      RemoveCartItem={RemoveCartItem}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      Increment={Increment}
                      Decrement={Decrement}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="row pt-5">
              <div className="col-md-6">
                <div className="discountCode">
                  <div className="head">
                    <p>Discount codes</p>
                  </div>
                  <div className="applyCoupon">
                    <input
                      type="text"
                      value={coupons}
                      onChange={(e) => setCoupons(e.target.value)}
                    />
                    <button
                      onClick={(e) => ApplyCouponsHandler(e)}
                      disabled={loading}
                    >
                      {loading ? "Wait.." : "APPLY"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="productSummary">
                  <div className="subTotal">
                    <h6 className="rightt" style={{ color: "#989898" }}>
                      Subtotal
                    </h6>
                    <h6 style={{ color: "#989898" }}>
                      Estimated Shipping Cost
                    </h6>
                    {couponData?.discount && <h6 style={{ color: "#989898" }}>Coupon Discount</h6>}
                  </div>
                  <div className="shipping">
                    <h6 className="price" style={{ color: "#989898" }}>
                      £{Number(subTotal).toFixed(2)}
                    </h6>
                    <h6 style={{ color: "#989898" }}>Free Shipping</h6>
                    {couponData?.discount && <h6 className="price" style={{ color: "#989898" }}>
                      £{couponData?.discount}
                    </h6>}
                  </div>
                </div>
                <div className="Total">
                  <div className="property">
                    <p>TOTAL COST</p>
                  </div>
                  <div className="value">
                    <p>
                      {" "}
                      £
                      {couponData?.discount
                        ? Number(subTotal).toFixed(2) - Number(couponData?.discount).toFixed
                        : Number(subTotal).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-baseline">
            <div className="col-md-6">
              <div className="button-group">
                <Link to="/" className="btn">
                  Continue Shopping
                </Link>
                <a
                  href="/"
                  className="btn grey"
                  onClick={() => dispatch(ClearCart())}
                >
                  Clear
                </a>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <div className="proceed">
                {isLogin ? (
                  <Link
                    to={`/Checkout`}
                    state={{
                      data: {
                        CartData: CartData,
                        total: subTotal,
                        couponData: couponData,
                      },
                    }}
                    className="btn"
                  >
                    Proceed To Checkout
                  </Link>
                ) : (
                  <Link
                    to={`/Signin`}
                    state={{
                      path: "/Checkout",
                      data: {
                        CartData: CartData,
                        total: subTotal,
                        couponData: couponData,
                      },
                    }}
                    className="btn"
                  >
                    Proceed To Checkout
                  </Link>
                )}

                <h6 style={{ color: "#989898" }}>
                  You’ll still have a chance to review your order
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Productcart;
