import { TOrder } from "../../data/types/types";
import { GET_ORDER_ACTIONS, TGetOrderActions } from "../actions/get-order";

type TGetOrderState = {
  requestStart: boolean;
  requestError: string | null;
  order: TOrder | null;
};

export const initialState: TGetOrderState = {
  requestStart: false,
  requestError: null,
  order: null,
};

export const getOrderReducer = (
  state = initialState,
  action: TGetOrderActions
): TGetOrderState => {
  switch (action.type) {
    case GET_ORDER_ACTIONS.START:
      return { ...state, requestStart: true, requestError: null };
    case GET_ORDER_ACTIONS.SUCCESS:
      return {
        ...state,
        requestStart: false,
        requestError: null,
        order: action.order,
      };
    case GET_ORDER_ACTIONS.ERROR:
      return {
        ...state,
        requestStart: false,
        requestError: action.message,
        order: null,
      };

    default:
      return state;
  }
};
