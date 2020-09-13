import { combineReducers } from "redux";
import { IAction } from "../../types/reduxTypes";
import authReducer from "./modules/auth";
import commentReducer from "./modules/comment";
import postReducer from "./modules/post";
import profileReducer from "./modules/profile";

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type TState = ReturnType<typeof appReducer> | undefined;

export const rootReducer = (state: TState, action: IAction) => {
  if (action.type === "USER_LOG_OUT") {
    state = undefined;
    try {
      localStorage.setItem("state", "");
      sessionStorage.removeItem("user");
    } catch (err) {
      console.log("Reducer Error", err);
    }
  }
  return appReducer(state, action);
};
