import { defaultReducerObject } from "../../../helpers/constants";
import { apiList } from "../../../../utils/actionNames/actionNames";
import { IAction, AppThunk } from "../../../../types/reduxTypes";
import { defaultReducer } from "../../../helpers/defaultReducer";
import { makeApiRequest } from "../../../../services/ApiRequest/apiRequest";
import { defaultAction } from "../../../helpers/defaultAction";

const obj = defaultReducerObject;
let apiDetails = apiList.auth.signUp;

export default function signUpReducer(
    store = { ...obj },
    action: IAction
) {
    let state = Object.assign({}, store);
    let actionName = apiDetails.actionName;
    return defaultReducer(actionName, action, state);
}

export const signUp = (requestData: any): AppThunk => async (dispatch) => {
    const responseData = await makeApiRequest(
        apiDetails,
        requestData,
        apiDetails.method,
        dispatch
    );
    defaultAction(apiDetails, dispatch, responseData);
    return responseData;
};

export const resetSignUp = () => {
    return {
        type: apiDetails.actionName + '_RESET',
    };
};
