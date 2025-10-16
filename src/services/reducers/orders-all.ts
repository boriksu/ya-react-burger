import { TOrder } from "../../data/types/types";
import { ORDERS_ALL_ACTIONS, TOrdersAllActions } from "../actions/orderAll";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

type TOrdersAllState = {
  connected: boolean;
  message: TOrdersList | null;
  error: string | null;
};

const initialState: TOrdersAllState = {
  connected: false,
  message: null,
  error: null,
};

export function ordersAllReducer(
  state = initialState,
  action: TOrdersAllActions
): TOrdersAllState {
  switch (action.type) {
    case ORDERS_ALL_ACTIONS.SUCCESS:
      return { ...state, error: null, connected: true };

    case ORDERS_ALL_ACTIONS.ERROR:
      return { ...state, error: action.error, connected: false };

    case ORDERS_ALL_ACTIONS.CLOSED:
      return { ...state, error: null, connected: false };

    case ORDERS_ALL_ACTIONS.MESSAGE:
      return { ...state, error: null, message: action.message };

    default:
      return state;
  }
}
