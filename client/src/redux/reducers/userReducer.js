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

export const INITIAL_STATE = {
  currentUser: null,
  error: false,
  fetching: false,
  fetchingAvatar: false,
  updatingProfile: false,
  token: localStorage.getItem("token"),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_START:
    case SIGN_IN_START: {
      return { ...state, error: false, fetching: true };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
        error: false,
        fetching: false,
        token: action.payload.token,
      };
    }
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    }
    case BOOKMARK_POST: {
      const { operation, postId } = action.payload;
      // complete copy: only work with basic properties - no functions or methods
      let bookmarks = JSON.parse(JSON.stringify(state.currentUser.bookmarks));
      if (operation === "add") {
        bookmarks.push({ post: postId });
      } else {
        bookmarks = bookmarks.filter((bookmark) => bookmark.post !== postId);
      }
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          bookmarks,
        },
      };
    }
    case CHANGE_AVATAR_SUCCESS: {
      return {
        ...state,
        currentUser: { ...state.currentUser, avatar: action.payload },
        fetchingAvatar: false,
      };
    }
    case REMOVE_AVATAR_START:
    case CHANGE_AVATAR_START: {
      return { ...state, fetchingAvatar: true };
    }
    case REMOVE_AVATAR_FAILURE:
    case CHANGE_AVATAR_FAILURE: {
      return {
        ...state,
        fetchingAvatar: false,
        error: action.payload,
      };
    }
    case REMOVE_AVATAR_SUCCESS: {
      // Removing the avatar key from the currentUser object
      const { avatar, ...additionalKeys } = state.currentUser;
      return {
        ...state,
        currentUser: { ...additionalKeys },
        fetchingAvatar: false,
        error: false,
      };
    }
    case UPDATE_PROFILE_START: {
      return {
        ...state,
        updatingProfile: true,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        error: false,
        updatingProfile: false,
        currentUser: { ...state.currentUser, ...action.payload },
      };
    }
    case UPDATE_PROFILE_FAILURE: {
      return {
        ...state,
        updatingProfile: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
