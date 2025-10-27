import { TIngredient, TIngredientConstructor } from "../../data/types/types";
import {
  CONSTRUCTOR_ACTIONS,
  TBurgerConstructorActions,
} from "../actions/burger-constuctor";

export type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: Array<TIngredientConstructor>;
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_ACTIONS.SELECT_BUN:
      return { ...state, bun: action.item };
    case CONSTRUCTOR_ACTIONS.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.item],
      };
    case CONSTRUCTOR_ACTIONS.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (_item, index) => index !== action.index
        ),
      };
    case CONSTRUCTOR_ACTIONS.REORDER_INGREDIENTS:
      const newState = { ...state, ingredients: [...state.ingredients] };
      [
        newState.ingredients[action.index1],
        newState.ingredients[action.index2],
      ] = [
        newState.ingredients[action.index2],
        newState.ingredients[action.index1],
      ];
      return newState;
    case CONSTRUCTOR_ACTIONS.CLEAN_ORDER:
      return initialState;

    default:
      return state;
  }
};
