import { v4 as uuid } from "uuid";

export const CONSTRUCTOR_ACTIONS = {
  SELECT_BUN: "SELECT_BUN",
  ADD_INGREDIENT: "ADD_INGREDIENT",
  REMOVE_INGREDIENT: "REMOVE_INGREDIENT",
  REORDER_INGREDIENTS: "REORDER_INGREDIENTS",
  CLEAN_ORDER: "CLEAN_ORDER",
};

export const addIngredient = (item) => {
  return {
    type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT,
    item: { ...item, id: uuid() },
  };
};

export const TAB_ACTIONS = {
  CHANGE_TAB: "CHANGE_TAB",
};
