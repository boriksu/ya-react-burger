import { TOrdersAllActions } from "../../data/types/order-all";
import { TOrder } from "../../data/types/types";
import { ORDERS_ALL_ACTIONS } from "../actions";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

type TOrdersAllState = {
  isLoadedData: boolean;
  message: TOrdersList | null;
  error: string | null;
};

const initialState: TOrdersAllState = {
  isLoadedData: false,
  message: null,
  error: null,
};

export const ordersAllReducer = (
  state = initialState,
  action: TOrdersAllActions
): TOrdersAllState => {
  switch (action.type) {
    case ORDERS_ALL_ACTIONS.SUCCESS:
      return { ...state, error: null, isLoadedData: true };

    case ORDERS_ALL_ACTIONS.ERROR:
      return { ...state, error: action.error, isLoadedData: false };

    case ORDERS_ALL_ACTIONS.CLOSED:
      return { ...state, error: null, isLoadedData: false };

    case ORDERS_ALL_ACTIONS.MESSAGE:
      return { ...state, error: null, message: action.message };

    default:
      return state;
  }
};
