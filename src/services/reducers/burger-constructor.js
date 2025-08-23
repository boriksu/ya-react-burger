import { CONSTRUCTOR_ACTIONS } from "../actions/index";

const initialState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export function burgerConstructorReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTRUCTOR_ACTIONS.SELECT_BUN:
      return { ...state, bun: action.item };
    case CONSTRUCTOR_ACTIONS.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.item] };
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
    case CONSTRUCTOR_ACTIONS.UPDATE_TOTAL:
      return { ...state, totalPrice: action.totalPrice };

    default:
      return state;
  }
}
