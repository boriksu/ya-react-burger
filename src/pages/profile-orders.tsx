import naming from "../data/ru.json";

import { useEffect, useMemo } from "react";
import { WSS_URL } from "../data/api/api-data";
import { ORDERS_USER_ACTIONS } from "../services/actions";
import { useDispatch, useSelector } from "../services/hook";
import { getOrdersUser } from "../services/selectors";

import OrdersList from "../components/OrderList/OrderList";
import { TOrder } from "../data/types/types";
import styles from "./profile-order.module.css";

type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const { isLoadedData, message } = useSelector(getOrdersUser);

  const messageSorted: TOrdersList | null = useMemo(() => {
    if (!message) {
      return null;
    }
    let orders = [...message.orders];
    return { ...message, orders: orders.sort((a, b) => b.number - a.number) };
  }, [message]);

  useEffect(() => {
    dispatch({
      type: ORDERS_USER_ACTIONS.START,
      url: `${WSS_URL}/orders`,
      addToken: true,
    });

    return () => {
      dispatch({ type: ORDERS_USER_ACTIONS.END });
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-4 mt-4">
        {naming.ProfileOrders.history}
      </h1>

      {!isLoadedData && (
        <p className="text text_type_main-default text_color_inactive">
          {naming.ProfileOrders.loadingHistory}
        </p>
      )}

      {isLoadedData && !!messageSorted && messageSorted.orders.length > 0 ? (
        <OrdersList orders={messageSorted.orders} />
      ) : isLoadedData && messageSorted?.orders.length === 0 ? (
        <p className="text text_type_main-default text_color_inactive">
          {naming.ProfileOrders.emptyHistory}
        </p>
      ) : null}
    </div>
  );
};

export default ProfileOrders;
