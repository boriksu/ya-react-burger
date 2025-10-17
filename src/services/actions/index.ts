import { v4 as uuid } from "uuid";
import { TIngredient } from "../../data/types/types";

export const CONSTRUCTOR_ACTIONS = {
  SELECT_BUN: "SELECT_BUN",
  ADD_INGREDIENT: "ADD_INGREDIENT",
  REMOVE_INGREDIENT: "REMOVE_INGREDIENT",
  REORDER_INGREDIENTS: "REORDER_INGREDIENTS",
  CLEAN_ORDER: "CLEAN_ORDER",
};

export const addIngredient = (item: TIngredient) => {
  return {
    type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT,
    item: { ...item, id: uuid() },
  };
};

export const TAB_ACTIONS = {
  CHANGE_TAB: "CHANGE_TAB",
};

export interface ITabAction {
  type: typeof TAB_ACTIONS.CHANGE_TAB;
  tab: string;
}

export type TTabInfoActions = ITabAction;

export enum ORDERS_ALL_ACTIONS {
  START = "ORDERS_ALL_START",
  OPEN = "ORDERS_ALL_OPEN",
  END = "ORDERS_ALL_END",
  SUCCESS = "ORDERS_ALL_SUCCESS",
  ERROR = "ORDERS_ALL_ERROR",
  CLOSED = "ORDERS_ALL_CLOSED",
  MESSAGE = "ORDERS_ALL_MESSAGE",
}

export enum ORDERS_USER_ACTIONS {
  START = "ORDERS_USER_START",
  OPEN = "ORDERS_USER_OPEN",
  END = "ORDERS_USER_END",
  SUCCESS = "ORDERS_USER_SUCCESS",
  ERROR = "ORDERS_USER_ERROR",
  CLOSED = "ORDERS_USER_CLOSED",
  MESSAGE = "ORDERS_USER_MESSAGE",
}
