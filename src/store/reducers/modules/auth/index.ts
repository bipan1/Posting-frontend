import { combineReducers } from "redux";
import loginReducer from "./login";
import signUpReducer from "./signUp";

const authReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
})

export default authReducer