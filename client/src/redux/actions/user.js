import {
  BOOKMARK_POST,
  CHANGE_AVATAR_FAILURE,
  CHANGE_AVATAR_START,
  CHANGE_AVATAR_SUCCESS,
  REMOVE_AVATAR_FAILURE,
  REMOVE_AVATAR_START,
  REMOVE_AVATAR_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_START,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from "../types/user";

import { disconnectSocket } from "../actions/socket";
import { bookmarkPost as bookmark } from "../api/post";
import { registerUser, login } from "../api/authentication";
import { changeAvatar, removeAvatar, updateProfile } from "../api/user";

export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(disconnectSocket());
  dispatch({ type: SIGN_OUT });
};

export const signInSuccess = (user) => {
  localStorage.setItem("token", user.token);
  return {
    type: SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailure = (err) => ({
  type: SIGN_IN_FAILURE,
  payload: err,
});

export const signUpStart = (email, fullName, username, password) => async (
  dispatch
) => {
  try {
    dispatch({ type: SIGN_UP_START });
    const response = await registerUser(email, fullName, username, password);
    dispatch(signInStart(null, null, response.token));
  } catch (err) {
    dispatch({ type: SIGN_UP_FAILURE, payload: err.message });
  }
};

export const signInStart = (usernameOrEmail, password, authToken) => async (
  dispatch
) => {
  try {
    dispatch({ type: SIGN_IN_START });
    const response = await login(usernameOrEmail, password, authToken);
    dispatch(signInSuccess(response));
  } catch (err) {
    if (authToken) dispatch(signOut);
    dispatch(signInFailure(err.message));
  }
};

export const bookmarkPost = (postId, authToken) => async (dispatch) => {
  try {
    const response = await bookmark(postId, authToken);
    dispatch({
      type: BOOKMARK_POST,
      payload: { ...response, postId },
    });
  } catch (err) {
    return err;
  }
};
export const changeAvatarStart = (formData, authToken) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_AVATAR_START });
    const response = await changeAvatar(formData, authToken);
    dispatch({
      type: CHANGE_AVATAR_SUCCESS,
      payload: response.avatar,
    });
  } catch (err) {
    dispatch({
      type: CHANGE_AVATAR_FAILURE,
      payload: err.message,
    });
  }
};

export const removeAvatarStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_AVATAR_START });
    await removeAvatar(authToken);
    dispatch({ type: REMOVE_AVATAR_SUCCESS });
  } catch (err) {
    dispatch({ type: REMOVE_AVATAR_FAILURE, payload: err.message });
  }
};

export const updateProfileStart = (authToken, updates) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_START });
    const response = await updateProfile(authToken, updates);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response });
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: err.message });
  }
};
