import { ALERTS, SET_ALERTS } from "../Types";

const initialState = {
  alert: null,
};

const Alerts = (state = initialState, action) => {
  switch (action.type) {
    case ALERTS:
      return {
        ...state,
        alert: action.payload,
      };

    case SET_ALERTS:
      return {
        ...state,
        alert: action.payload,
      };

    default:
      return state;
  }
};
export default Alerts;
