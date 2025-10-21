import { TIngredient } from "../../data/types/types";
import {
  INGREDIENTS_ACTIONS,
  TIngredientWindowActions,
} from "../actions/ingredients-action";

type TIngredientWindowsState = {
  displayedIngredient: TIngredient | null;
};

const initialState: TIngredientWindowsState = {
  displayedIngredient: null,
};

export const ingredientWindowReducer = (
  state = initialState,
  action: TIngredientWindowActions
): TIngredientWindowsState => {
  switch (action.type) {
    case INGREDIENTS_ACTIONS.SHOW_DETAILS:
      return { ...state, displayedIngredient: action.item };
    default:
      return state;
  }
};
