import moment from "moment";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { ramdomImage } from "../../../constant/ConstantFunction";

function SingleReviewCard(props) {
  const { item } = props;
  console.log("test", item);
  return (
    <>
      <div className="mainReview">
        <div className="brieflyReview">
          <div className="img-box">
            <figure className="image-review">
              {item?.customer?.profile_url == null ? (
                <img
                  src={`${ramdomImage(`${item?.customer?.full_name}}`)}`}
                  alt=""
                  className="image-fluid image-width"
                />
              ) : (
                <img
                  src={item?.customer?.profile_url}
                  alt=""
                  className="image-fluid image-width"
                />
              )}
            </figure>
          </div>
          <div className="contentDv">
            <div className="info">
              <h6 className="name">{item?.customer?.full_name}</h6>
              <div className="spacer">-</div>
              <h6 className="date">
                {moment(item?.customer?.created_at).format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </h6>
            </div>
            <div className="descrip">
              <p>{item?.comment}</p>
              <div className="rating mb-3">
                <div className="stars">
                  <Rating
                    size={18}
                    readonly={true}
                    ratingValue={
                      Math.round(item?.rating) === 1
                        ? "20"
                        : Math.round(item?.rating) === 2
                        ? "40"
                        : Math.round(item?.rating) === 3
                        ? "60"
                        : Math.round(item?.rating) === 4
                        ? "80"
                        : Math.round(item?.rating) === 5
                        ? "100"
                        : null
                    }
                  />

                  <div className="star-count">
                    <span>{item?.rating}</span>
                  </div>
                </div>
                {/* <div className="rply-btn">
                  <a href="#!">Reply</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleReviewCard;
