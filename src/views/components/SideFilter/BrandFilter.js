import React from "react";

function BrandFilter(props) {
  const {
    BrandsDataRedux,
    handleSelectCategory,
    brandId,
    // BrandFilterHandler,
    handleSelectBrand,
  } = props;
  return (
    <>
      <div className="brand-filter">
        <div className="head filter-border py-3">
          <h4 className="font-25">Brands</h4>
        </div>
        {BrandsDataRedux?.map((item, index) => {
          return index < 6 ? (
            <div className="brands" key={item?.id}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="defaultCheck8"
                  value={brandId}
                  checked={brandId == item.id}
                  onChange={(e) => handleSelectBrand(item?.id, e.target.checked)}
                />
                <label className="form-check-label" for="defaultCheck8">
                  <div className="name">
                    <span className="font-14">{item?.name}</span>
                  </div>
                </label>
              </div>
              {/* <div className="brandCount">
                <span className="font-14">{item?.brand_products_count}</span>
              </div> */}
            </div>
          ) : null;
        })}
        {/* <div>
          <button onClick={(e) => BrandFilterHandler(e)}>Brand Filter</button>
        </div> */}
      </div>
    </>
  );
}

export default BrandFilter;