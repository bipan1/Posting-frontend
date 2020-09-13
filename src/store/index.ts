import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers/rootReducer";
import { saveState, loadState } from "./helpers/storeHelpers";

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, loadState(), composeWithDevTools(middleware));

store.subscribe(() => saveState(store.getState()));
