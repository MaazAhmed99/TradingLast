import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ChangePasswordModal(props) {
  const {
    setIsOpenModal,
    isOpenModal,
    confirmPassword,
    setConfirmPassword,
    password,
    setPassword,
    ChangePasswordHandler,
    setCurrentPassword,
    currentPassword,
    modalBtn,
    setModalBtn,
  } = props;

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
        <h2 style={{ textAlign: "center" }}>Change Password</h2>
        <form>
          <div className="form-group">
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              id="password"
              className="form-control"
              placeholder="Current Password"
            />
          </div>
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-success btn-SaveProfile"
              onClick={(e) => ChangePasswordHandler(e)}
              disabled={modalBtn}
            >
              {modalBtn ? "Loading.." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
