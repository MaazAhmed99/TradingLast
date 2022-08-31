import React from "react";
import { Rating } from "react-simple-star-rating";

function ReviewCard(props) {
  const {
    comment,
    setComment,
    rating,
    setRating,
    handleRating,
    SubmitRating,
    loading,
  } = props;
  return (
    <>
      <div className="container review-custom">
        <div className="rating-inner-cont mt-3 mb-3">
          <Rating onClick={handleRating} ratingValue={rating} />
        </div>
        <div className="mt-3 mb-3">
          <textarea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mt-3 mb-3">
          <button
            className="btn review-btn"
            onClick={(e) => SubmitRating(e)}
            disabled={loading}
          >
            {loading ? "Loading.." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
