import React from "react";

const Featureproduct = (props) => {
  const { featureitem } = props;
  return (
    <>
      <div className="card product">
        <div className="card-body">
          <span className="notify-badge">{featureitem.badge}</span>
          <div className="card-img-actions">
            {" "}
            <img
              src={featureitem.img}
              className="card-img img-fluid"
              width="96"
              height="350"
              alt=""
            />{" "}
          </div>
        </div>
        <hr className="p-0 m-0" />
        <div className="card-body">
          <div className="d-flex justify-content-between bd-highlight">
            <div className="bd-highlight">
              <p className="text-muted">{featureitem.name}</p>
            </div>
            <div className="bd-highlight"></div>
            <div className="bd-highlight">
              <div>
                <i className="fa fa-star star"></i>
                <i className="fa fa-star star"></i>
                <i className="fa fa-star star"></i>
                <i className="fa fa-star-o star"></i>
                <i className="fa fa-star-o star"></i>
              </div>
            </div>
          </div>
          <div className="">
            <h6 className="font-weight-semibold">
              <a href="#" className="text-black  product-title" data-abc="true">
                {featureitem.description}
              </a>
            </h6>
          </div>
          <div className="d-flex justify-content-around bd-highlight">
            <div className="p-2 bd-highlight">
              <h3 className="mb-0 font-weight-semibold price">
                {featureitem.saleprice}{" "}
                <span>
                  <strike>{featureitem.regprice}</strike>
                </span>{" "}
              </h3>
            </div>
            <div className="p-2 bd-highlight"></div>
            <div className="p-2 bd-highlight">
              {" "}
              <button type="button" className="btn bg-cart">
                <i className="fa fa-cart-plus mr-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featureproduct;
