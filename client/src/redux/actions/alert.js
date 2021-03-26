import { HIDE_ALERT, SET_ALERT_TIMEOUT_ID, SHOW_ALERT } from "../types/alert";

export const hideAlert = () => ({
  type: HIDE_ALERT,
});

export const showAlert = (text, onClick = null) => (dispatch, getState) => {
  const timeout = setTimeout(() => {
    dispatch(hideAlert());
    dispatch({ type: SET_ALERT_TIMEOUT_ID, payload: null });
  }, 5000);
  dispatch({ type: SET_ALERT_TIMEOUT_ID, payload: timeout });
  // If there is an alert already present,
  // disable it and allow the animation to finish
  // before toggling the new one
  const state = getState();
  if (state.alert.showAlert) {
    dispatch(hideAlert());
    setTimeout(() => {
      dispatch({
        type: SHOW_ALERT,
        payload: { text, onClick },
      });
    }, 500);
  } else {
    dispatch({
      type: SHOW_ALERT,
      payload: { text, onClick },
    });
  }
};
