import { useEffect } from "react";
import { WSS_URL } from "../data/api/api-data";
import { ORDERS_ALL_ACTIONS } from "../services/actions/index";
import { useDispatch, useSelector } from "../services/hook";
import { getOrdersAll } from "../services/selectors";

import Loader from "../components/Loader/Loader";
import OrdersList from "../components/OrderList/OrderList";
import OrdersStatus from "../components/OrdersStatus/OrdersStatus";
import styles from "./feed.module.css";

const FeedPage = () => {
  const dispatch = useDispatch();
  const { connected, error, message } = useSelector(getOrdersAll);

  useEffect(() => {
    const websocketUrl = `${WSS_URL}/orders/all`;
    dispatch({ type: ORDERS_ALL_ACTIONS.START, url: websocketUrl });

    return () => {
      dispatch({ type: ORDERS_ALL_ACTIONS.END });
    };
  }, [dispatch]);

  const isLoading = !connected && !error;
  const hasData = connected && message;

  return (
    <div className="feed">
      {isLoading && <Loader />}

      {error && (
        <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>
      )}

      {hasData && (
        <main className={styles.content}>
          <section className={styles.orders_section}>
            <h1 className="text text_type_main-large mt-6">Лента заказов</h1>
            <OrdersList orders={message.orders} />
          </section>

          <section className={styles.stats_section}>
            <OrdersStatus
              orders={message.orders}
              total={message.total}
              totalToday={message.totalToday}
            />
          </section>
        </main>
      )}
    </div>
  );
};

export default FeedPage;
