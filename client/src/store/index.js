import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer} from "./authReducer";
import {thisUserReducer} from "./thisUserReducer";
import {companionReducer} from "./companionReducer"

const rootReducer = combineReducers({
  authReducer,
  thisUserReducer,
  companionReducer
})

export const store = createStore(rootReducer, composeWithDevTools())