import { INGREDIENTS_ACTIONS } from "../actions/load-ingredients";

const initialState = {
  dataLoading: false,
  dataHasErrors: false,
  data: [],
};

export function loadIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_ACTIONS.FETCH_REQUEST:
      return { ...state, dataLoading: true, dataHasErrors: false };
    case INGREDIENTS_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        dataLoading: false,
        dataHasErrors: false,
        data: action.data,
      };
    case INGREDIENTS_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        dataLoading: false,
        dataHasErrors: true,
        data: initialState.data,
      };

    default:
      return state;
  }
}
