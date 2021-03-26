import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS,
} from "../types/notification";

import { retrieveNotifications, readNotifications } from "../api/notification";

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});

export const readNotificationsStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: READ_NOTIFICATIONS });
    await readNotifications(authToken);
  } catch (err) {
    console.warn(err.message);
  }
};

export const fetchNotificationsStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_NOTIFICATIONS_START });
    const response = await retrieveNotifications(authToken);
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
      payload: err.message,
    });
  }
};
