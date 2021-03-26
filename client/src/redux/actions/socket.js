import { CONNECT, DISCONNECT } from "../types/socket";
import { connect } from "../api/socket";
import { addNotification } from "../actions/notification";
import { addPost, removePost } from "../actions/feed";

export const connectSocket = () => (dispatch) => {
  const socket = connect();

  dispatch({ type: CONNECT, payload: socket });
  socket.on("newNotification", (data) => {
    dispatch(addNotification(data));
  });

  socket.on("newPost", (data) => {
    dispatch(addPost(data));
  });
  socket.on("deletePost", (data) => {
    dispatch(removePost(data));
  });
};

export const disconnectSocket = () => ({
  type: DISCONNECT,
});
