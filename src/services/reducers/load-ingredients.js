import { INGREDIENTS_ACTIONS } from "../actions/ingredients-action";

const initialState = {
  dataLoading: false,
  dataErrors: false,
  data: [],
};

export function loadIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_ACTIONS.FETCH_REQUEST:
      return { ...state, dataLoading: true, dataErrors: false };
    case INGREDIENTS_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        dataLoading: false,
        dataErrors: false,
        data: action.data,
      };
    case INGREDIENTS_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        dataLoading: false,
        dataErrors: true,
        data: initialState.data,
      };

    default:
      return state;
  }
}
