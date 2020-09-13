import { IDefaultDispatchTypes } from "../../types/reduxTypes";

/**
 * Creates dispatch types object.
 * @param {String} actionName - action name for the api.
 * @returns {Object} - types of actions
 */
export const createDispatchTypes = (
  actionName: string
): IDefaultDispatchTypes => {
  return {
    progressDispatch: actionName + "_PROGRESS",
    successDispatch: actionName + "_SUCCESS",
    failureDispatch: actionName + "_FAILURE",
    resetAll: actionName + "_RESET",
  };
};
