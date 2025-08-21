import { SET_TAB } from "../actions/index";

const BUN = "bun";

const initialState = {
  tab: BUN,
};

export function tabInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
}
