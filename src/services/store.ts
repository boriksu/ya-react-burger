import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { authReducer } from "./reducers/auth";
import { burgerConstructorReducer } from "./reducers/burger-constructor";
import { createOrderReducer } from "./reducers/create-order";
import { ingredientWindowReducer } from "./reducers/ingredient-window";
import { loadIngredientsReducer } from "./reducers/load-ingredients";
import { ordersAllReducer } from "./reducers/orders-all";
import { ordersUserReducer } from "./reducers/orders-user";
import { tabInfoReducer } from "./reducers/tab-info";

import { wsOrdersAllActions } from "../data/types/order-all";
import { wsOrdersUserActions } from "../data/types/orders-user";
import { socketMiddleware } from "../services/socket-middleware";

const rootReducer = combineReducers({
  loadIngredients: loadIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientWindow: ingredientWindowReducer,
  createOrder: createOrderReducer,
  tabInfo: tabInfoReducer,
  auth: authReducer,
  ordersAll: ordersAllReducer,
  ordersUser: ordersUserReducer,
});

const isDevelopment = process.env.NODE_ENV !== "production";

// Явно создаем массив middleware для лучшей читаемости
const customMiddlewares = [
  socketMiddleware(wsOrdersAllActions),
  socketMiddleware(wsOrdersUserActions),
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...customMiddlewares),
  devTools: isDevelopment,
});

export default store;
