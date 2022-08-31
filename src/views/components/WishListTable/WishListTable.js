import React from "react";

function WishListTable(props) {
  const { item, index, AddToCartHandler, DeleteWishListHandler } = props;
  console.log(item);
  return (
    <>
      <tr className="products bookmark" key={item?.id}>
        <td className="productDetail">
          <div className="product-detail">
            <div className="imgBox">
              <figure>
                <img
                  src={`${item?.product?.thumbnail_url}`}
                  className="image-fluid image-width"
                  alt=""
                />
              </figure>
            </div>
            <div className="name">
              <p className="font-13">{item?.product?.name}</p>
            </div>
          </div>
        </td>
        <td className="Proprice">
          <h5 className="font-15">{item?.product?.unit_price}</h5>
        </td>
        <td className="addcart">
          <div className="ActionBtn">
            <div className="cartBtn">
              <p onClick={() => AddToCartHandler(item)}>
                <a>
                  Add to cart{" "}
                  <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                </a>
              </p>
            </div>
            <div
              className="deleteBtn"
              onClick={() => DeleteWishListHandler(item?.product?.id)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default WishListTable;
