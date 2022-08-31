import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

const Alert = (props) => {
  if (props?.alerts) {
    return (
      <>
        {toast(props?.alerts?.message)}
        <ToastContainer />
      </>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => {
  return {
    alerts: state?.Alerts?.alert,
  };
};

export default connect(mapStateToProps)(Alert);
