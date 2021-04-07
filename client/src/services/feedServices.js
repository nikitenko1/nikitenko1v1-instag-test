import axios from "axios";

/**
 * Fetches a complete post with comments and the fully
 * sized image instead of a thumbnail image
 * @function getPost
 * @param {string} postId Id of the post to fetch
 * @returns {object} The post requested
 */
// server: postRouter.get('/feed/:offset', requireAuth, retrievePostFeed);
export const retrieveFeedPosts = async (authToken, offset = 0) => {
  try {
    const response = await axios.get(`/api/post/feed/${offset}`, {
      headers: {
        authorization: authToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
