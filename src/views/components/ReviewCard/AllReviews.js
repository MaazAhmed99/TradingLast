import React from "react";
import ReactPaginate from "react-paginate";
import SingleReviewCard from "./SingleReviewCard";

function AllReviews(props) {
  const {
    productReview,
    setProductReview,
    ReviewsDataRedux,
    ParamData,
    handlePageClick,
    pageCount,
  } = props;
  console.log(productReview);
  console.log(ParamData);
  return (
    <div>
      <section className="ClientsReviewsSec">
        <div className="container">
          {/* <!-- Tabs Start Here --> */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="reviews-tab"
                data-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
                aria-selected="true"
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="specification-tab"
                data-toggle="tab"
                href="#specification"
                role="tab"
                aria-controls="specification"
                aria-selected="false"
              >
                Specification
              </a>
            </li>
          </ul>
          {/* <!-- Tabs Start Here --> */}

          {/* <!-- Tabs Content Start Here --> */}
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              <div className="head">
                <h4 className="font-25 fw-600">
                  {ReviewsDataRedux?.length} Reviews
                </h4>
              </div>
              {ReviewsDataRedux?.map((item, index) => {
                return <SingleReviewCard item={item} index={index} />;
              })}
              <div>
                <div className="pagination-container">
                  <ReactPaginate
                    previousLabel="<<"
                    nextLabel=" >>"
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
            <div
              className="tab-pane fade"
              id="specification"
              role="tabpanel"
              aria-labelledby="specification-tab"
            >
              <div className="mainReview">
                <div className="brieflyReview">
                  <div className="img-box">
                    <figure>
                      <img src="img/review1.png" alt="" />
                    </figure>
                  </div>
                  <div className="contentDv">
                    <div className="info">
                      <h6 className="name">{ParamData?.name}</h6>
                      <div className="spacer">-</div>
                    </div>
                    <h4 className="font-20 fw-500">Specification</h4>
                    <div className="descrip">
                      <p
                        dangerouslySetInnerHTML={{ __html: ParamData?.details }}
                      />
                    </div>
                    <div className="description"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllReviews;
