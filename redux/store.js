import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";

const rootReducers = combineReducers({ authReducer })

export const store = createStore(rootReducers, applyMiddleware(thunk))