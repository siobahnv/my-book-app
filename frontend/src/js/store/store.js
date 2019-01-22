import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();
const store = createStore(
    rootReducer, 
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;