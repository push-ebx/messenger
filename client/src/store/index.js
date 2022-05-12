import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer} from "./authReducer";
import {thisUserReducer} from "./thisUserReducer";
import {companionReducer} from "./companionReducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  thisUserReducer,
  companionReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))