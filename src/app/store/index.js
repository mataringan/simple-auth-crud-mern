import { combineReducers } from "redux";
import dataReducer from "./reducers/dataReducers";

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
