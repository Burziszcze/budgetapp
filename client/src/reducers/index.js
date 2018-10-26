import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import budgetReducer from "./budgetReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  budget: budgetReducer
});
