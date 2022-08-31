import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StepThree(props) {
  const {
    CheckOutData,
    PlaceOrderHandler,
    phone,
    address,
    region,
    townCity,
    setLoading,
    loading,
  } = props;
  const Naviagte = useNavigate();
  const countryData = useSelector((state) => state.AuthReducer.country);

  var selectedCountry = countryData?.filter((curElem) => {
    return curElem?.name == region;
  });
  console.log(countryData);
  console.log(region);
  console.log(selectedCountry);
  return (
    <>
      <h2 className="font-40 fw-600 text-center pb-5">Confirm Order</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="setpper-step-container">
            <div className="productsummary-info">
              <div className="topBaR">
                <div className="headd">
                  <h4 className="font-20 mb-2">Products</h4>
                </div>
              </div>
              <table class="table step3">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {CheckOutData?.CartData?.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">
                            <div className="quantity mt-3">{index + 1}</div>
                          </th>
                          <td>
                            <div className="imgBox">
                              <figure>
                                <img
                                  src={`${item?.productitem?.thumbnail_url}`}
                                  alt=""
                                  className="image-fluid image-width"
                                />
                              </figure>
                            </div>
                          </td>
                          <td>
                            <div className="name mt-3">
                              <h5>{item?.productitem?.name}</h5>
                            </div>
                          </td>
                          <td>
                            <div className="quantity mt-3">
                              {" "}
                              Quantity: {item?.quantity}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>

              <div className="shipment-Info">
                <div className="topBaR">
                  <div className="headd">
                    <h4 className="font-20">Shipment Address</h4>
                  </div>
                  {/* <div className="iconDvv">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </div> */}
                </div>
                <div className="uerInfo">
                  <div className="country info-flex">
                    <div className="property">
                      <h5 className="fw-500">Country:</h5>
                    </div>
                    <div className="value">
                      <h5 className="fw-300">{selectedCountry[0]?.name}</h5>
                    </div>
                  </div>
                  <div className="address info-flex">
                    <div className="property">
                      <h5 className="fw-500">Address:</h5>
                    </div>
                    <div className="value">
                      <h5 className="fw-300">{address}</h5>
                    </div>
                  </div>
                  <div className="phone info-flex">
                    <div className="property">
                      <h5 className="fw-500">Phone:</h5>
                    </div>
                    <div className="value">
                      <h5 className="fw-300">{phone}</h5>
                    </div>
                  </div>
                  <div className="state info-flex">
                    <div className="property">
                      <h5 className="fw-500">State:</h5>
                    </div>
                    <div className="value">
                      <h5 className="fw-300">{townCity}</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="billing-detail">
                <div className="topBaR">
                  <div className="headd">
                    <h4 className="font-20">Billing Details</h4>
                  </div>
                  <div className="iconDvv">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="card-infoo">
                  <div className="img-box">
                    <figure>
                      <img src={paymentcard} alt="" />
                    </figure>
                  </div>
                  <div className="card-number">
                    <span>My Personal Card</span>
                    <br />
                    <input type="text" defaultValue="**********1239" />
                  </div>
                </div>
              </div> */}
              <ul className="list-inline">
                <li>
                  <button
                    type="button"
                    className="default-btn next-step"
                    onClick={(e) => PlaceOrderHandler(e)}
                  >
                    {loading ? "Loading.." : "Confirm & place order"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-5 setpper-step-container">
          <div className="OrderSummary">
            <div className="headingg">
              <h3 className="font-25 pb-3">Order Summery</h3>
            </div>
            <div className="order_info">
              <div className="itemTotal order-flex">
                <div className="property">
                  <h5 className="fw-500">Item Total:</h5>
                </div>
                <div className="value">
                  <h5 className="fw-300">£{Number(CheckOutData?.total).toFixed(2)}</h5>
                </div>
              </div>
              <div className="shipmentDelivery order-flex">
                <div className="property">
                  <h5 className="fw-500">Shipment & Delivery:</h5>
                </div>
                <div className="value">
                  <h5 className="fw-300">£0</h5>
                </div>
              </div>
              <div className="promoApplied order-flex">
                <div className="property">
                  <h5 className="fw-500">Promo Applied:</h5>
                </div>
                <div className="value">
                  <h5 className="fw-300">
                  £
                    {CheckOutData?.couponData?.discount
                      ? CheckOutData?.couponData?.discount
                      : "0"}
                  </h5>
                </div>
              </div>
            </div>
            <div className="orderTotal">
              <div className="property">
                <h5 className="fw-700">Order Total</h5>
              </div>
              <div className="value">
                <h5 className="fw-400">
                £
                  {CheckOutData?.total >=
                  CheckOutData?.couponData?.min_purchase ? (
                    <>
                      {`${Number(CheckOutData?.total).toFixed(2)}` -
                        `${CheckOutData?.couponData?.discount}`}
                    </>
                  ) : (
                    Number(CheckOutData?.total).toFixed(2)
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepThree;
