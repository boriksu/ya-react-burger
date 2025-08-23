import { INGREDIENTS_ACTIONS } from "../actions/ingredients-action";

const initialState = {
  displayedIngredient: null,
};

export function ingredientWindowReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_ACTIONS.SHOW_DETAILS:
      return { ...state, displayedIngredient: action.item };
    default:
      return state;
  }
}
