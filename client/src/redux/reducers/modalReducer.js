import { HIDE_MODAL, SHOW_MODAL } from "../types/modal";

// @param {object } props Props to pass to the modal child.
// w@param {string} component The directory of a component in the Components directory
const INITIAL_STATE = {
  modals: [],
  props: null,
  component: null,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIDE_MODAL: {
      const modals = state.modals;
      const modifiedModals = modals.filter(
        (modal) => modal.component !== action.payload
      );
      return { modals: modifiedModals };
    }
    case SHOW_MODAL: {
      const { props, component } = action.payload;
      return { modals: [...state.modals, { props, component }] };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
