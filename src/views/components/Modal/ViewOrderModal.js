import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ViewOrderModal(props) {
  const { setIsOpenModal, isOpenModal, selectedData, setSelectedData } = props;
  console.log(selectedData);
  return (
    <>
      <Modal
        isOpen={isOpenModal}
        toggle={() => {
          setIsOpenModal(false);
        }}
        className="custom-modal modal-width orderView-Modal"
      >
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="modal-close"
          onClick={() => setIsOpenModal(false)}
        />
        <h2 style={{ textAlign: "center" }}>Order Details</h2>
        <table>
          <thead>
            <tr className="topbar">
              <th></th>
              <th className="productDetail">PRODUCT NAME</th>
              <th className="Proprice">Amount</th>
              <th className="productDetail">OrderNo</th>
              <th className="productDetail">Status</th>
            </tr>
          </thead>

          <tbody>
            {selectedData?.details?.map((item, index) => {
              console.log(item);
              return (
                <tr className="products modal-padding" key={index}>
                  <td className="Proprice">
                    <figure className="modal-productImg">
                      <img
                        src={`${item?.product?.thumbnail_url}`}
                        alt=""
                        className="image-fluid image-width"
                      />
                    </figure>
                  </td>
                  <td className="productDetail">
                    <div className="product-detail">
                      <div className="name">
                        <p className="font-13">{item?.product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="name">
                    <p className="font-13"> {item?.price}</p>
                  </td>
                  <td className="name">
                    <p className="font-13">{item?.order_id}</p>
                  </td>
                  <td className="Proprice">
                    <p className="font-13"> {item?.delivery_status}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default ViewOrderModal;
