import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ImageUrl } from "../../../network/ApiUrl";

function ProductImagesSlider(props) {
  const { ParamData } = props;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  console.log("89989898w22",ParamData,);

    // console.log(JSON.parse(ParamData).length);
  return (
    <>
      <div className="product-slide">
        <Slider asNavFor={nav2} ref={slider1}>
          {ParamData.map((item, index) => {
            console.log("<MMAMMAS",item);
            return (
              <div className="product-images mainimage-container" key={index}>
                <figure>
                  <img
                    src={`${ImageUrl}/${item}`}
                    alt=""
                    className="image-fluid image-width"
                  />
                </figure>
              </div>
            );
          })}
        </Slider>

        <Slider
          asNavFor={nav1}
          ref={slider2}
          slidesToShow={ParamData.length}
          swipeToSlide={true}
          focusOnSelect={true}
          className="slick-custom"
        >
          {ParamData.map((item, index) => {
            console.log(item);
            return (
              <div className="inner-image-container" key={index}>
                <figure>
                  <img
                    src={`${ImageUrl}/${item}`}
                    alt=""
                    className="image-fluid image-width"
                  />
                </figure>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default ProductImagesSlider;
