import React, { useState, useEffect } from "react";
import "../../assets/css/bookmark.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveWishListData,
  WishListData,
} from "../../redux/actions/AuthActions";
import {
  ClearWishList,
  DeleteWishList,
  GetWishList,
} from "../../network/Network";
import WishListTable from "../components/WishListTable/WishListTable";
import { toast } from "react-toastify";
import { AddToCart } from "../../redux/actions/CartActions";
import { SpinnerCircular } from "spinners-react";
import ReactPaginate from "react-paginate";

const Bookmark = (props) => {
  const dispatch = useDispatch();
  const allStates = useSelector((state) => state.CartReducer.cartData);
  const Token = useSelector((state) => state.AuthReducer.token);
  const UserData = useSelector((state) => state.AuthReducer.users);
  const wishlistDataRedux = useSelector(
    (state) => state.AuthReducer.wishlistData
  );
  const [bookMarkData, setBookMarkData] = useState([]);
  const [clearLoading, setClearLoading] = useState(false);
  const [spinLoad, setSpinLoad] = useState(false);
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = async (data) => {
    console.log(data.selected);
    setCurrentPage(data?.selected + 1);
  };

  // Get WishList
  useEffect(() => {
    setSpinLoad(true);
    GetWishList(currentPage, Token)
      .then((res) => {
        console.log(res);
        setSpinLoad(false);
        setBookMarkData(res?.data?.data?.wishlist?.data);
        dispatch(WishListData(res?.data?.data?.wishlist?.data));
        const total = res?.data?.data?.wishlist?.total;
        const limit = res?.data?.data?.wishlist?.per_page;
        setPageCount(Math.ceil(total / limit));
      })
      .catch((err) => {
        console.log(err);
        setSpinLoad(false);
      });
  }, [currentPage]);

  const ClaerBookmarkHandler = (e) => {
    e.preventDefault();
    setClearLoading(true);
    ClearWishList(UserData?.id, Token)
      .then((res) => {
        setClearLoading(false);
        console.log(res);
        dispatch(WishListData(res?.data?.data));
        setBookMarkData(res?.data?.data);
        toast.success("successfully removed!");
      })
      .catch((err) => {
        setClearLoading(false);
        console.log(err);
      });
  };

  const AddToCartHandler = (item) => {
    let checkItemAlreadyExist = allStates.filter(
      (val) => val?.id === item?.product?.id
    );
    if (checkItemAlreadyExist.length > 0) {
      toast.info("Item Already Exist in Cart");
      return;
    } else {
      let colorData = JSON.parse(item?.product?.colors);
      let data = {
        id: item?.product?.id,
        price: item?.product?.unit_price,
        quantity: 1,
        color: colorData[0],
        productitem: item?.product,
      };
      dispatch(AddToCart(data));
      DeleteWishListHandler(item?.product?.id);
    }
  };

  const DeleteWishListHandler = (id, index) => {
    console.log(id);
    setSpinLoad(true);
    DeleteWishList(id, Token)
      .then((res) => {
        console.log(res?.data?.data);
        setSpinLoad(false);
        dispatch(RemoveWishListData(id));
        // bookMarkData?.splice(index, 1);
        // setBookMarkData(res?.data?.response?.data);
      })
      .catch((err) => {
        console.log(err);
        setSpinLoad(false);
      });
  };

  console.log(bookMarkData);
  return (
    <>
      <Header />
      <section className="bookmark">
        <div className="container">
          <div className="heading">
            <h3 className="text-center title font-40 fw-600">
              Product BookMarks
            </h3>
          </div>

          <div className="tableDv">
            {spinLoad ? (
              <>
                <div className="loader-container">
                  <SpinnerCircular size="80px" color="#8dc63e" />
                </div>
              </>
            ) : (
              <table>
                <thead>
                  <tr className="topbar">
                    <th className="productDetail">PRODUCT NAME</th>
                    <th className="Proprice">UNIT PRICE</th>
                    <th className="addcart">ADD TO CART</th>
                  </tr>
                </thead>
                <tbody>
                  {bookMarkData?.length === 0 ? (
                    <p className="mt-4" style={{ textAlign: "center" }}>
                      No Record Found!!
                    </p>
                  ) : null}
                  {wishlistDataRedux?.map((item, index) => {
                    return (
                      <WishListTable
                        item={item}
                        index={index}
                        AddToCartHandler={AddToCartHandler}
                        DeleteWishListHandler={DeleteWishListHandler}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}

            <div className="button-group">
              <Link to="/" className="btn">
                Continue Shopping
              </Link>
              <a className="btn grey" onClick={(e) => ClaerBookmarkHandler(e)}>
                {clearLoading ? "Loading..." : "Clear Bookmarks"}
              </a>
            </div>
            <div className="pagination-container mt-5">
              <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
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
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Bookmark;
