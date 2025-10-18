import { RootState } from "../data/types/types";

export const getAuth = (state: RootState) => state.auth;
export const getIngredients = (state: RootState) => state.loadIngredients;
export const getConstructor = (state: RootState) => state.burgerConstructor;
export const getOrder = (state: RootState) => state.createOrder;
export const getDisplayedIngredient = (state: RootState) =>
  state.ingredientWindow.displayedIngredient;
export const getTab = (state: RootState) => state.tabInfo.tab;
export const getOrdersAll = (state: RootState) => state.ordersAll;
export const getOrdersUser = (state: RootState) => state.ordersUser;
export const getOrderOne = (state: RootState) => state.getOrder;
