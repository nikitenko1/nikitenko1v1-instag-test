import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import alertReducer from "./reducers/alertReducer";
import socketReducer from "./reducers/socketReducer";
import notificationReducer from "./reducers/notificationReducer";
import feedReducer from "./reducers/feedReducer";

const rootReducer = combineReducers({
  userrr: userReducer,
  modalll: modalReducer,
  alerttt: alertReducer,
  sockettt: socketReducer,
  notificationnn: notificationReducer,
  feeddd: feedReducer,
});

export default rootReducer;
