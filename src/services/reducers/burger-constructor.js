import { v4 as uuid } from "uuid";
import { CONSTRUCTOR_ACTIONS } from "../actions/index";

const initialState = {
  bun: null,
  ingredients: [],
};

export function burgerConstructorReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTRUCTOR_ACTIONS.SELECT_BUN:
      return { ...state, bun: action.item };
    case CONSTRUCTOR_ACTIONS.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.item, id: uuid() }],
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

    default:
      return state;
  }
}
