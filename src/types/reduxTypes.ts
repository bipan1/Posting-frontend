import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/reducers/rootReducer";
import { Action } from "redux";

export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface IAction {
  type: string;
  payload?: any;
}

export type TStatus = null | 0 | 1 | 100;

export interface IDefaultReducerObject {
  status: TStatus;
  data: any;
  message: null | string;
}

export interface IDefaultDispatchTypes {
  progressDispatch: string;
  successDispatch: string;
  failureDispatch: string;
  resetAll: string;
}
