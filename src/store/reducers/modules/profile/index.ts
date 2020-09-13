import { combineReducers } from "redux";
import saveProfileReducer from "./saveProfile";
import getProfileReducer from "./getProfile"
import updateProfileReducer from "./updateProfile";

const profileReducer = combineReducers({
    saveProfileData: saveProfileReducer,
    profileData: getProfileReducer,
    updateProfileData: updateProfileReducer,
})

export default profileReducer;