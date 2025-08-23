import { ORDER_ACTIONS } from "../actions/create-order";

const initialState = {
  orderLoading: false,
  orderHasErrors: false,
  orderNumber: null,
};

export function createOrderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_REQUEST:
      return { ...state, orderLoading: true, orderHasErrors: false };
    case ORDER_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orderHasErrors: false,
        orderNumber: action.orderNumber,
      };
    case ORDER_ACTIONS.CREATE_FAILURE:
      return {
        ...state,
        orderLoading: false,
        orderHasErrors: true,
        orderNumber: initialState.orderNumber,
      };
    case ORDER_ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}
