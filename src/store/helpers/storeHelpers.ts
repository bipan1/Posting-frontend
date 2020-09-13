import { RootState } from "../reducers/rootReducer";
import { AppThunk } from "../../types/reduxTypes";

/**
 * Load the state from our local storage.
 * @returns {Object} - State for our redux
 */
export const loadState = () : RootState | undefined => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log("Load State Error", err)
        return undefined;
    }
}

/**
 * Save the redux state in local storage.
 * @param {Object} state - our redux state
 * @returns {void}
 */
export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log("Save State Error", err)
    }
}

/**
 * Dispatches action to logout a user from the system.
 */
export const logoutAction = (): AppThunk => async dispatch => {
    try {
        localStorage.removeItem("tk");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
    } catch (err) {
        console.log("LogOut Error", err)
    }

    dispatch({type: "USER_LOG_OUT", payload: {}})
}