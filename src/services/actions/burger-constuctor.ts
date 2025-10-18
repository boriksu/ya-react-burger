import { v4 as uuid } from "uuid";
import { TIngredient, TIngredientConstructor } from "../../data/types/types";

export const CONSTRUCTOR_ACTIONS = {
  SELECT_BUN: "SELECT_BUN",
  ADD_INGREDIENT: "ADD_INGREDIENT",
  REMOVE_INGREDIENT: "REMOVE_INGREDIENT",
  REORDER_INGREDIENTS: "REORDER_INGREDIENTS",
  CLEAN_ORDER: "CLEAN_ORDER",
} as const;

export interface ISelectBunAction {
  type: typeof CONSTRUCTOR_ACTIONS.SELECT_BUN;
  item: TIngredient;
}

export interface IAddIngredientAction {
  type: typeof CONSTRUCTOR_ACTIONS.ADD_INGREDIENT;
  item: TIngredientConstructor;
}

export interface IRemoveIngredientAction {
  type: typeof CONSTRUCTOR_ACTIONS.REMOVE_INGREDIENT;
  index: number;
}

export interface IReorderIngredientAction {
  type: typeof CONSTRUCTOR_ACTIONS.REORDER_INGREDIENTS;
  index1: number;
  index2: number;
}

export interface ICleanOrderAction {
  type: typeof CONSTRUCTOR_ACTIONS.CLEAN_ORDER;
}

export type TBurgerConstructorActions =
  | ISelectBunAction
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IReorderIngredientAction
  | ICleanOrderAction;

export const addIngredient = (item: TIngredient) => {
  return {
    type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT,
    item: { ...item, id: uuid() },
  };
};
