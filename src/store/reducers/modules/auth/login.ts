import { defaultReducerObject } from "../../../helpers/constants";
import { apiList } from "../../../../utils/actionNames/actionNames";
import { makeApiRequest } from "../../../../services/ApiRequest/apiRequest";
import { defaultReducer } from "../../../helpers/defaultReducer";
import { defaultAction } from "../../../helpers/defaultAction";
import { IAction, AppThunk } from "../../../../types/reduxTypes";
import TokenService from "../../../../services/AuthToken/authToken";

export interface ILoginData {
  username: string;
  password: string;
}

const obj = defaultReducerObject;
let apiDetails = apiList.auth.token;

export default function loginReducer(store = { ...obj }, action: IAction) {
  let state = Object.assign({}, store);
  let actionName = apiDetails.actionName;
  return defaultReducer(actionName, action, state);
}

export const loginAction = (requestData: ILoginData): AppThunk => async (
  dispatch
) => {
  const responseData = await makeApiRequest(
    apiDetails,
    requestData,
    "POST",
    dispatch
  );

  let payload = { ...responseData };
  if (responseData.status === 200) {
    console.log(responseData)
    TokenService.setToken(responseData.data.data);
    if (responseData.data && responseData.data.data) {
      payload.data = {
        status: 1,
        message: "Login Successful",
        data: { ...responseData.data.data },
      };
    }
  }
  await defaultAction(apiDetails, dispatch, payload);
  return responseData;
};

export const resetLoginData = () => {
  return {
    type: apiDetails.actionName + "_RESET",
  };
};
