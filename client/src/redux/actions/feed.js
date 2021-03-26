import {
  ADD_POST,
  CLEAR_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  REMOVE_POST,
} from "../types/feed";
import { retrieveFeedPosts } from "../api/feed";

export const fetchFeedPostsStart = (authToken, offset) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS_START });
    const response = await retrieveFeedPosts(authToken, offset);
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response });
  } catch (err) {
    dispatch({ type: FETCH_POSTS_FAILURE, payload: err.message });
  }
};

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const removePost = (postId) => ({
  type: REMOVE_POST,
  payload: postId,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});
