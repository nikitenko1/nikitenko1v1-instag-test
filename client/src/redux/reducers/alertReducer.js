import { HIDE_ALERT, SET_ALERT_TIMEOUT_ID, SHOW_ALERT } from "../types/alert";

const INITIAL_STATE = {
  text: "",
  onClick: null,
  showAlert: false,
  timeoutId: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ALERT: {
      const { text, onClick } = action.payload;
      return {
        ...state,
        text,
        onClick,
        showAlert: true,
      };
    }
    case HIDE_ALERT: {
      return { ...state, text: "", onClick: null, showAlert: false };
    }
    case SET_ALERT_TIMEOUT_ID: {
      return {
        ...state,
        timeoutId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default alertReducer;
