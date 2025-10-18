import { FC, useMemo } from "react";
import naming from "../../data/ru.json";
import { TOrder } from "../../data/types/types";
import OrderColumn from "./OrderColumn/OrdersColumn";
import styles from "./OrdersStatus.module.css";

interface TProps {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}

const OrdersStatus: FC<TProps> = ({ orders, total, totalToday }) => {
  const ordersPerColumn = 5;

  const { completedOrders, inProgressOrders } = useMemo(() => {
    const completed = orders
      .filter((order: TOrder) => order.status === "done")
      .map((order: TOrder) => order.number);

    const inProgress = orders
      .filter((order: TOrder) => order.status === "pending")
      .map((order: TOrder) => order.number);

    return {
      completedOrders: completed,
      inProgressOrders: inProgress,
    };
  }, [orders]);

  const {
    completedFirstColumn,
    completedSecondColumn,
    inProgressFirstColumn,
    inProgressSecondColumn,
  } = useMemo(
    () => ({
      completedFirstColumn: completedOrders.slice(0, ordersPerColumn),
      completedSecondColumn: completedOrders.slice(
        ordersPerColumn,
        2 * ordersPerColumn
      ),
      inProgressFirstColumn: inProgressOrders.slice(0, ordersPerColumn),
      inProgressSecondColumn: inProgressOrders.slice(
        ordersPerColumn,
        2 * ordersPerColumn
      ),
    }),
    [completedOrders, inProgressOrders]
  );

  return (
    <>
      <div className={styles.orders_container}>
        {/* Завершенные заказы */}
        <section>
          <p className="text text_type_main-medium">
            {naming.OrderStatus.ready}
          </p>
          <div
            className={`${styles.numbers_container} ${styles.completed_orders}`}
          >
            <OrderColumn
              orderNumbers={completedFirstColumn}
              linkStyle={styles.completed_order_link}
            />
            <OrderColumn
              orderNumbers={completedSecondColumn}
              linkStyle={styles.completed_order_link}
            />
          </div>
        </section>

        {/* Заказы в процессе выполнения */}
        <section>
          <p className="text text_type_main-medium">
            {naming.OrderStatus.process}
          </p>
          <div className={styles.numbers_container}>
            <OrderColumn
              orderNumbers={inProgressFirstColumn}
              linkStyle={styles.in_progress_order_link}
            />
            <OrderColumn
              orderNumbers={inProgressSecondColumn}
              linkStyle={styles.in_progress_order_link}
            />
          </div>
        </section>
      </div>

      {/* Статистика выполнения */}
      <section>
        <p className="text text_type_main-medium">{naming.OrderStatus.all}</p>
        <p
          className={`${styles.highlighted_text} text text_type_digits-large pb-8`}
        >
          {total}
        </p>
      </section>

      <section>
        <p className="text text_type_main-medium">{naming.OrderStatus.today}</p>
        <p
          className={`${styles.highlighted_text} text text_type_digits-large pb-8`}
        >
          {totalToday}
        </p>
      </section>
    </>
  );
};

export default OrdersStatus;
