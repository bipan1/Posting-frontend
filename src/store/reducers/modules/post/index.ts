import { combineReducers } from "redux";
import deletePostReducer from "./deletePost";
import savePostReducer from "./savePost";
import updatePostReducer from "./updatePost";
import getAllPostsReducer from "./getAllPosts"
import getOwnPostsReducer from "./getOwnPosts";

const postReducer = combineReducers({
    savePostData: savePostReducer,
    deletePostData: deletePostReducer,
    updatePostData: updatePostReducer,
    allPosts: getAllPostsReducer,
    ownPosts: getOwnPostsReducer
})

export default postReducer;