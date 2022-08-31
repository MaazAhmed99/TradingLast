import React from "react";

function PriceRange(props) {
  const {
    startPrice,
    setStartPrice,
    endPrice,
    setEndPrice,
    PriceFilterHandler,
  } = props;
  return (
    <>
      <div className="price-filter">
        <div className="head filter-border pt-4">
          <h4 className="font-25">Price</h4>
        </div>
        <div className="range-head">
          <p>Range:</p>
          <p className="fw-600">
          £{startPrice} - £{endPrice}
          </p>
        </div>
        <div className="range-slide pb-3">
          <div className="from">
            <label for="from">From</label>
            <br />
            <input
              type="number"
              id="from"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
            />
          </div>
          <div className="spacer"></div>
          <div className="from">
            <label for="to">To</label>
            <br />
            <input
              type="number"
              id="to"
              value={endPrice}
              onChange={(e) => setEndPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn price-btn"
          onClick={(e) => PriceFilterHandler(e)}
        >
          Price Filter
        </button>
      </div>
    </>
  );
}

export default PriceRange;
