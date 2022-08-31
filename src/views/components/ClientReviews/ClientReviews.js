import React from "react";
import productimage from "../../../assets/img/productdetail.png";
import proimages1 from "../../../assets/img/productimages.png";
import client1 from "../../../assets/img/review1.png";
import client2 from "../../../assets/img/review2.png";
import client3 from "../../../assets/img/review3.png";
import client4 from "../../../assets/img/review4.png";
import pro1 from "../../../assets/img/tv1.png";
import pro2 from "../../../assets/img/tv2.png";
import pro3 from "../../../assets/img/tv3.png";

function ClientReviews() {
  return (
    <>
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
                <h4 className="font-25 fw-600">275 Reviews</h4>
              </div>
              <div className="mainReview">
                <div className="brieflyReview">
                  <div className="img-box">
                    <figure>
                      <img src={client1} alt="" />
                    </figure>
                  </div>
                  <div className="contentDv">
                    <div className="info">
                      <h6 className="name">Joeby Ragpa</h6>
                      <div className="spacer">-</div>
                      <h6 className="date">12 April, 2014 at 16:50</h6>
                    </div>
                    <div className="descrip">
                      <p>
                        We possess within us two minds. So far I have written
                        only of the conscious mind. I would now like to
                        introduce you to your second mind, the hidden and
                        mysterious subconscious. Our subconscious mind contains
                        such power and complexity that it literally staggers the
                        imagination.
                      </p>
                      <div className="rating">
                        <div className="stars">
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star-o star"></i>
                          <i className="fa fa-star-o star"></i>
                          <div className="star-count">
                            <span>3.9</span>
                          </div>
                        </div>
                        <div className="rply-btn">
                          <a href="#!">Reply</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="replyDv">
                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src={client2} alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your second mind , the hidden and
                          mysterious subconscious.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}

                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src={client3} alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}

                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src={client4} alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your second mind,
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}
                </div>
              </div>

              <div className="mainReview pt-5 border-topp">
                <div className="brieflyReview">
                  <div className="img-box">
                    <figure>
                      <img src={client1} alt="" />
                    </figure>
                  </div>
                  <div className="contentDv">
                    <div className="info">
                      <h6 className="name">Joeby Ragpa</h6>
                      <div className="spacer">-</div>
                      <h6 className="date">12 April, 2014 at 16:50</h6>
                    </div>
                    <div className="descrip">
                      <p>
                        We possess within us two minds. So far I have written
                        only of the conscious mind. I would now like to
                        introduce you to your second mind, the hidden and
                        mysterious subconscious. Our subconscious mind contains
                        such power and complexity that it literally staggers the
                        imagination.
                      </p>
                      <div className="rating">
                        <div className="stars">
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star-o star"></i>
                          <i className="fa fa-star-o star"></i>
                          <div className="star-count">
                            <span>3.9</span>
                          </div>
                        </div>
                        <div className="rply-btn">
                          <a href="#!">Reply</a>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <h6 className="name">Joeby Ragpa</h6>
                      <div className="spacer">-</div>
                      <h6 className="date">12 April, 2014 at 16:50</h6>
                    </div>
                    <div className="descrip">
                      <p>
                        We possess within us two minds. So far I have written
                        only of the conscious mind. I would now like to
                        introduce you to your second mind, the hidden and
                        mysterious subconscious. Our subconscious mind contains
                        such power and complexity that it literally staggers the
                        imagination.
                      </p>
                      <div className="rating">
                        <div className="stars">
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star-o star"></i>
                          <i className="fa fa-star-o star"></i>
                          <div className="star-count">
                            <span>3.9</span>
                          </div>
                        </div>
                        <div className="rply-btn">
                          <a href="#!">Reply</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="replyDv">
                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src="img/review2.png" alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your second mind , the hidden and
                          mysterious subconscious.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}

                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src="img/review3.png" alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}

                  {/* <!-- Replies --> */}
                  <div className="brieflyReview">
                    <div className="img-box">
                      <figure>
                        <img src="img/review4.png" alt="" />
                      </figure>
                    </div>
                    <div className="contentDv">
                      <div className="info">
                        <h6 className="name">Joeby Ragpa</h6>
                        <div className="spacer">-</div>
                        <h6 className="date">12 April, 2014 at 16:50</h6>
                      </div>
                      <div className="descrip">
                        <p>
                          We possess within us two minds. So far I have written
                          only of the conscious mind. I would now like to
                          introduce you to your second mind,
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Replies --> */}
                </div>
              </div>

              <div className="mainReview pt-5 border-topp">
                <div className="brieflyReview">
                  <div className="img-box">
                    <figure>
                      <img src="img/review1.png" alt="" />
                    </figure>
                  </div>
                  <div className="contentDv">
                    <div className="info">
                      <h6 className="name">Joeby Ragpa</h6>
                      <div className="spacer">-</div>
                      <h6 className="date">12 April, 2014 at 16:50</h6>
                    </div>
                    <div className="descrip">
                      <p>
                        We possess within us two minds. So far I have written
                        only of the conscious mind. I would now like to
                        introduce you to your second mind, the hidden and
                        mysterious subconscious. Our subconscious mind contains
                        such power and complexity that it literally staggers the
                        imagination.
                      </p>
                      <div className="rating">
                        <div className="stars">
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star star"></i>
                          <i className="fa fa-star-o star"></i>
                          <i className="fa fa-star-o star"></i>
                          <div className="star-count">
                            <span>3.9</span>
                          </div>
                        </div>
                        <div className="rply-btn">
                          <a href="#!">Reply</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Tabs Content Start Here --> */}
        </div>
      </section>
    </>
  );
}

export default ClientReviews;
