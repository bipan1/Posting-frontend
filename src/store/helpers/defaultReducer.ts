import { defaultReducerObject } from "./constants";
import { IAction, IDefaultReducerObject } from "../../types/reduxTypes";

export function defaultReducer(
  actionName: string,
  action: IAction,
  state: IDefaultReducerObject
): IDefaultReducerObject {
  switch (action.type) {
    case actionName + "_PROGRESS": {
      // console.log({ actionName });
      return {
        ...state,
        data: null,
        status: 100,
      };
    }

    case actionName + "_SUCCESS": {
      return {
        ...state,
        message: action.payload.message,
        data: action.payload.data || null,
        status: 1,
      };
    }

    case actionName + "_FAILURE": {
      return {
        ...state,
        data: null,
        message: action.payload.message,
        status: 0,
      };
    }

    case actionName + "_RESET": {
      return { ...defaultReducerObject };
    }

    default: {
      return state;
    }
  }
}
