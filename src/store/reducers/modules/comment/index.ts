import { combineReducers } from "redux";
import addChildCommentReducer from "./addChildComment";
import addCommentReducer from "./addComment";
import getChildCommentsReducer from "./getChildComments";


const commentReducer = combineReducers({
    addCommentData: addCommentReducer,
    addChildCommentData: addChildCommentReducer,
    childComments: getChildCommentsReducer,
})

export default commentReducer;