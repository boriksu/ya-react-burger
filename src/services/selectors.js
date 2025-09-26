export const getAuth = (state) => state.auth;
export const getIngredients = (state) => state.loadIngredients;
export const getConstructor = (state) => state.burgerConstructor;
export const getOrder = (state) => state.createOrder;
export const getDisplayedIngredient = (state) =>
  state.ingredientWindow.displayedIngredient;
export const getTab = (state) => state.tabInfo.tab;
