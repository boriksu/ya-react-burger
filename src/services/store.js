import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as reducers from "./reducers";

export default configureStore({
  reducer: combineReducers(reducers),
});
