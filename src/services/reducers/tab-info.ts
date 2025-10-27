import { INGREDIENT_TYPES } from "../../data/ingredientType";
import { TAB_ACTIONS, TTabInfoActions } from "../actions//tab-info";

type TTabInfoState = {
  tab: string;
};

export const initialState: TTabInfoState = {
  tab: INGREDIENT_TYPES.BUN,
};

export const tabInfoReducer = (
  state = initialState,
  action: TTabInfoActions
): TTabInfoState => {
  switch (action.type) {
    case TAB_ACTIONS.CHANGE_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
};
