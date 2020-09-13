import { createDispatchTypes } from "./createDispatchTypes";
import { apiInformationType } from "../../types/generalTypes";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers/rootReducer";
import { Action } from "redux";

export const defaultAction = (
  apiDetails: apiInformationType,
  dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
  dispatchData: any
) => {
  let dispatchTypes = createDispatchTypes(apiDetails.actionName);
  if (dispatchData.data) {
    if (dispatchData.data.status === 1 || dispatchData.data.status === "1") {
      dispatch({
        type: dispatchTypes.successDispatch,
        payload: dispatchData.data,
      });
    } else {
      dispatch({
        type: dispatchTypes.failureDispatch,
        payload: dispatchData.data,
      });
    }
  } else {
    dispatch({ type: dispatchTypes.failureDispatch, payload: dispatchData });
  }
};
