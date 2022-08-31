import React from "react";
import { Link } from "react-router-dom";

const Cards = (props) => {
  const { item, index } = props;
  return (
    <>
      {/* to={`/Product-detail/${item?.slug}`} state={{ data: item }} */}
      <Link to={`/Product-detail/${item?.id}`} state={{ data: item }}>
        <img src={item?.thumbnail_url} className="img-fluid" key={index} />
      </Link>
    </>
  );
};

export default Cards;
