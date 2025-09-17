import { INGREDIENT_TYPES } from "../../data/ingredientType";
import { TAB_ACTIONS } from "../actions/index";

const initialState = {
  tab: INGREDIENT_TYPES.BUN,
};

export function tabInfoReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_ACTIONS.CHANGE_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
}
