import React from "react";
import { ImageUrl } from "../../../network/ApiUrl";
import { useSelector } from "react-redux";

function CartList(props) {
  const Token = useSelector((state) => state.AuthReducer.token);
  const UserRedux = useSelector((state) => state.AuthReducer.users);
  const {
    item,
    index,
    RemoveCartItem,
    quantity,
    setQuantity,
    Increment,
    Decrement,
  } = props;
  console.log(item ,'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
  console.log(item?.productitem?.current_stock,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  console.log(item?.quantity,'bbbbbbbbbbbbbbbbbbbbbbbbbbb');
  
  return (
    <>
      <tr className="products cart" key={item?.id}>
        <td className="productDetail">
          <div className="product-detail">
            <div className="imgBox">
              <figure>
                <img
                  src={`${item?.productitem?.thumbnail_url}`}
                  alt=""
                  className="image-fluid image-width"
                />
              </figure>
            </div>
            <div className="name">
              <p className="font-13">{item?.productitem?.name}</p>
            </div>
          </div>
        </td>
        <td className="Proprice">
          <h5 className="font-15">{item?.productitem?.unit_price}</h5>
        </td>
        <td className="qty">
          <div>
            <button
              className="btn increment-Decrement mr-2"
              onClick={() => Increment(item?.id)}
              disabled={UserRedux?.role === "Trader" || item?.productitem?.current_stock === item?.quantity}
            >
              +
            </button>
            {UserRedux?.role === "Trader"
              ? item?.productitem?.trade_qty
              : item?.quantity}
            <button
              className="btn increment-Decrement ml-2"
              onClick={() => Decrement(item?.id)}
              disabled={UserRedux?.role === "Trader"}
            >
              -
            </button>
          </div>
        </td>
        <td className="addcart">
          <div className="ActionBtn">
            <div className="cartBtn">
              <p>{Number(item?.quantity * item?.productitem?.unit_price).toFixed(2)}</p>
            </div>
            <div
              className="deleteBtn"
              onClick={() => RemoveCartItem(item?.productitem?.id)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default CartList;
