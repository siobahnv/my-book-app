import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(
    rootReducer, 
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;