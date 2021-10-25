import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  authReducer,
  ItemsReducer,
  panelDataReducer,
  userOderPreference,
} from "./reducer";
// remove logger at dev
const rootReducer = combineReducers({
  auth: authReducer,
  items: ItemsReducer,
  modalData: panelDataReducer,
  userPrefernce: userOderPreference,
});
const enhancer = applyMiddleware(thunk);
const store = createStore(rootReducer, {}, enhancer);
export default store;
