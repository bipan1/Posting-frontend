import { defaultReducerObject } from "../../../helpers/constants";
import { apiList } from "../../../../utils/actionNames/actionNames";
import { IAction, AppThunk } from "../../../../types/reduxTypes";
import { defaultReducer } from "../../../helpers/defaultReducer";
import { makeApiRequest } from "../../../../services/ApiRequest/apiRequest";
import { defaultAction } from "../../../helpers/defaultAction";

const obj = defaultReducerObject;
let apiDetails = apiList.post.savePost;

export default function savePostReducer(
    store = { ...obj },
    action: IAction
) {
    let state = Object.assign({}, store);
    let actionName = apiDetails.actionName;
    return defaultReducer(actionName, action, state);
}

export const savePost = (requestData: any): AppThunk => async (dispatch) => {
    const responseData = await makeApiRequest(
        apiDetails,
        requestData,
        apiDetails.method,
        dispatch
    );
    defaultAction(apiDetails, dispatch, responseData);
    return responseData;
};

export const resetsavePost = () => {
    return {
        type: apiDetails.actionName + '_RESET',
    };
};
