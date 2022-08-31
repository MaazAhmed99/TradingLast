import React, { useState, useEffect } from "react";
import "../../../assets/css/bookmark.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { WishListData } from "../../../redux/actions/AuthActions";
import { GetAllOrders, GetWishList } from "../../../network/Network";
import { ImageUrl } from "../../../network/ApiUrl";
import { SpinnerCircular } from "spinners-react";
import ReactPaginate from "react-paginate";
import ViewOrderModal from "../../components/Modal/ViewOrderModal";

const MyOrders = () => {
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.AuthReducer.token);
  const [myOrdersData, setMyOrdersData] = useState([]);
  const [spinLoad, setSpinLoad] = useState(true);
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const handlePageClick = async (data) => {
    console.log(data.selected);
    setCurrentPage(data?.selected + 1);
  };

  // Get all orders
  useEffect(() => {
    setSpinLoad(true);
    GetAllOrders(currentPage, Token)
      .then((res) => {
        console.log(res);
        setMyOrdersData(res?.data?.data?.data);
        const total = res?.data?.data?.total;
        const limit = res?.data?.data?.per_page;
        setPageCount(Math.ceil(total / limit));
        setSpinLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinLoad(false);
      });
  }, [currentPage]);

  const viewOrderHandler = (item) => {
    setIsOpenModal(true);
    setSelectedData(item);
  };
  return (
    <>
      <Header />

      <section className="bookmark">
        <div className="container">
          <div className="heading">
            <h3 className="text-center title font-40 fw-600">My Orders</h3>
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
                    <th>OrderNo</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>View</th>
                  </tr>
                </thead>

                {myOrdersData?.map((item, index) => {
                  console.log(item);
                  return (
                    <tr className="products" key={item?.id}>
                      <td className="Proprice">
                        <h5 className="font-15">{item?.id}</h5>
                      </td>
                      <td className="Proprice">
                        <h5 className="font-15">{item?.order_status}</h5>
                      </td>
                      <td className="Proprice">
                        <h5 className="font-15">{item?.order_amount}</h5>
                      </td>

                      <td className="Proprice">
                        <button
                          className="btn ViewDetails"
                          onClick={() => viewOrderHandler(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            )}

            <div className="pagination-container mt-3">
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
      {/* <!-- Book Mark End Here --> */}

      <Footer />
      <ViewOrderModal
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </>
  );
};

export default MyOrders;
