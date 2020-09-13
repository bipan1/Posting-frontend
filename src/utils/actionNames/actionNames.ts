import { apiMethods } from "utils/constants";

export const apiList = {
    auth: {
        token: {
            controllerName: "api/auth/login",
            actionName: "TOKEN",
            method: apiMethods.post,
        },
        signUp: {
            controllerName: "api/auth/",
            actionName: "SIGNUP",
            method: apiMethods.post,
        }
    },
    post: {
        savePost: {
            controllerName: "api/post/create",
            actionName: "SAVE_POST",
            method: apiMethods.post,
        },
        deletePost: {
            controllerName: "api/post/delete",
            actionName: "DELETE_POST",
            method: apiMethods.post,
        },
        updatePost: {
            controllerName: "api/post/update",
            actionName: "UPDATE_POST",
            method: apiMethods.post,
        },
        getAllPosts: {
            controllerName: "api/post/getAll",
            actionName: "GET_ALL_POSTS",
            method: apiMethods.post,
        },
        getOwnPosts: {
            controllerName: "api/post/getOwn",
            actionName: "GET_OWN_POSTS",
            method: apiMethods.get,
        }
    },
    comment: {
        addComment: {
            controllerName: "api/comment",
            actionName: "ADD_COMMENT",
            method: apiMethods.post,
        },
        addChildComment: {
            controllerName: "api/comment/child",
            method: apiMethods.post,
            actionName: "ADD_CHILD_COMMENT",
        },
        getChildComments: {
            controllerName: "api/comment/getChild",
            method: apiMethods.post,
            actionName: "GET_CHILD_COMMENT",
        }
    },
    profile: {
        saveProfile: {
            controllerName: "api/profile/create",
            actionName: "SAVE_PROFILE",
            method: apiMethods.post,
        },
        getProfile: {
            controllerName: "api/profile/getProfile",
            actionName: "GET_PROFILE",
            method: apiMethods.get,
        },
        updateProfile: {
            controllerName: "api/profile/update",
            actionName: "UPDATE_PROFILE",
            method: apiMethods.post,
        }
    }
};
