import { HIDE_MODAL, SHOW_MODAL } from "../types/modal";

/**
 * Hides a shown Modal
 * @function hideModal
 */
export const hideModal = (componentName) => ({
  type: HIDE_MODAL,
  payload: componentName,
});

/**
 * Shows the Modal component with a specified child and props
 * @function showModal
 * @param {object } props Props to pass to the modal child.
 * @param {string} component The directory of a component in the Components directory
 */
export const showModal = (props, component) => ({
  type: SHOW_MODAL,
  payload: { props, component },
});
