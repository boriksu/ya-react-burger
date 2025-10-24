import { ORDER_ACTIONS, TCreateOrderActions } from "../actions/order-action";

type TCreateOrderState = {
  orderLoading: boolean;
  orderErrors: boolean;
  orderNumber: number | null;
};

export const initialState: TCreateOrderState = {
  orderLoading: false,
  orderErrors: false,
  orderNumber: null,
};

export const createOrderReducer = (
  state = initialState,
  action: TCreateOrderActions
): TCreateOrderState => {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_REQUEST:
      return { ...state, orderLoading: true, orderErrors: false };
    case ORDER_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderErrors: false,
        orderNumber: action.orderNumber,
      };
    case ORDER_ACTIONS.CREATE_FAILURE:
      return {
        ...state,
        orderLoading: false,
        orderErrors: true,
        orderNumber: initialState.orderNumber,
      };
    case ORDER_ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};
