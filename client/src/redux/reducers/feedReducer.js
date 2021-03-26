import {
  ADD_POST,
  CLEAR_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  REMOVE_POST,
} from "../types/feed";

const INITIAL_STATE = {
  posts: [],
  fetching: true,
  error: false,
  hasMore: false,
};

const feedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_START: {
      return {
        ...state,
        fetching: true,
        error: false,
      };
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: false,
        posts: [...state.posts, ...action.payload],
        hasMore: action.payload.length === 5,
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case REMOVE_POST: {
      // complete copy: only work with basic properties - no functions or methods
      const posts = JSON.parse(JSON.stringify(state.posts));
      const postIndex = posts.findIndex((post) => post._id === action.payload);
      if (postIndex) {
        posts.splice(postIndex, 1);
      }
      return {
        ...state,
        posts,
      };
    }
    case CLEAR_POSTS: {
      return {
        ...state,
        posts: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default feedReducer;
