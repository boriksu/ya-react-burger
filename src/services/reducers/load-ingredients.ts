import { TIngredient } from "../../data/types/types";
import {
  INGREDIENTS_ACTIONS,
  TLoadIngredientsActions,
} from "../actions/ingredients-action";

type TLoadIngredientsState = {
  dataLoading: boolean;
  dataErrors: boolean;
  data: Array<TIngredient>;
};

const initialState: TLoadIngredientsState = {
  dataLoading: false,
  dataErrors: false,
  data: [],
};

export const loadIngredientsReducer = (
  state = initialState,
  action: TLoadIngredientsActions
) => {
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
};
