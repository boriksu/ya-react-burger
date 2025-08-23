import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { burgerConstructorReducer } from "../services/reducers/burger-constructor";
import { createOrderReducer } from "../services/reducers/create-order";
import { ingredientWindowReducer } from "../services/reducers/ingredient-window";
import { loadIngredientsReducer } from "../services/reducers/load-ingredients";
import { tabInfoReducer } from "../services/reducers/tab-info";

const rootReducer = combineReducers({
  loadIngredients: loadIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientWindow: ingredientWindowReducer,
  createOrder: createOrderReducer,
  tabInfo: tabInfoReducer,
});

export default configureStore({
  reducer: rootReducer,
});
