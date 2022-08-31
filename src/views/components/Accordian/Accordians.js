import React from "react";

function Accordians(props) {
  const { item, index, handleSelectCategory, checked } = props;
  return (
    <>
      <div className="card">
        <div className="card-header" id="ToggleOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#mainToggle"
              aria-expanded="false"
              aria-controls="mainToggle"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="defaultCheck1"
                  value={checked}
                  onChange={(e) => handleSelectCategory(item?.id)}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  <div className="name">
                    <span>{item?.name}</span>
                  </div>
                </label>
              </div>
              <div className="angls">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </button>
          </h5>
        </div>
        {item?.childes.map((childItem, index) => {
          return (
            <div
              id="mainToggle"
              className="collapse show"
              aria-labelledby="ToggleOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                <div id="accordion-inner">
                  <div className="card">
                    <div className="card-header" id="innerToggle">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link pl-4"
                          data-toggle="collapse"
                          data-target="#InnerToggleOne"
                          aria-expanded="false"
                          aria-controls="InnerToggleOne"
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="defaultCheck2"
                              value={checked}
                              onChange={(e) =>
                                handleSelectCategory(childItem?.id)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck2"
                            >
                              <div className="name">
                                <span>{childItem?.name}</span>
                              </div>
                            </label>
                          </div>
                          <div className="angls">
                            <i
                              className="fa fa-angle-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </button>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Accordians;

{
  /* <div id="accordion">
<div className="card">
  <div className="card-header" id={item?.id}>
    <h5 className="mb-0">
      <button
        className="btn btn-link"
        data-toggle="collapse"
        data-target={`#${item?.name}`}
        aria-expanded="true"
        aria-controls={item?.name}
      >
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue=""
          id="defaultCheck1"
          value={checked}
          onChange={(e) => handleSelectCategory(item?.id)}
        />
        <span>{item?.name}</span>
        <div className="angls">
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </div>
      </button>
    </h5>
  </div>

  <div
    id={item?.name}
    className="collapse show"
    aria-labelledby={item?.id}
    data-parent="#accordion"
  >
    {item?.childes.map((childItem, index) => {
      return (
        <div className="card-body">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue=""
            id="defaultCheck2"
            value={checked}
            onChange={(e) => handleSelectCategory(childItem?.id)}
          />
          {childItem?.name}
        </div>
      );
    })}
  </div>
</div>
</div> */
}
