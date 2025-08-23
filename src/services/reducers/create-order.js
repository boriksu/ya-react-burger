import { ORDER_ACTIONS } from "../actions/order-action";

const initialState = {
  orderLoading: false,
  orderErrors: false,
  orderNumber: null,
};

export function createOrderReducer(state = initialState, action) {
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
}
