import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TOrder } from "../../data/types/types";
import styles from "./OrdersStatus.module.css";

interface TProps {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}

const OrdersStatus: FC<TProps> = ({ orders, total, totalToday }) => {
  const location = useLocation();
  const ordersPerColumn = 10;

  // Группируем заказы по статусам
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

  // Разделяем заказы на колонки для отображения
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

  // Компонент для отображения колонки с номерами заказов
  const OrderNumbersColumn = ({
    orderNumbers,
    linkStyle,
  }: {
    orderNumbers: number[];
    linkStyle: string;
  }) => (
    <ul className={styles.orders_list}>
      {orderNumbers.map((orderNumber, index) => (
        <li key={index} className="mt-2 mr-8">
          <Link
            to={`${orderNumber}`}
            state={{ location }}
            className={linkStyle}
          >
            <span className="text text_type_digits-default">{orderNumber}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className={styles.orders_container}>
        {/* Завершенные заказы */}
        <section className={styles.section}>
          <p className="text text_type_main-medium">Готовы:</p>
          <div
            className={`${styles.numbers_container} ${styles.completed_orders}`}
          >
            <OrderNumbersColumn
              orderNumbers={completedFirstColumn}
              linkStyle={styles.completed_order_link}
            />
            <OrderNumbersColumn
              orderNumbers={completedSecondColumn}
              linkStyle={styles.completed_order_link}
            />
          </div>
        </section>

        {/* Заказы в процессе выполнения */}
        <section className={styles.section}>
          <p className="text text_type_main-medium">В работе:</p>
          <div className={styles.numbers_container}>
            <OrderNumbersColumn
              orderNumbers={inProgressFirstColumn}
              linkStyle={styles.in_progress_order_link}
            />
            <OrderNumbersColumn
              orderNumbers={inProgressSecondColumn}
              linkStyle={styles.in_progress_order_link}
            />
          </div>
        </section>
      </div>

      {/* Статистика выполнения */}
      <section className={styles.section}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p
          className={`${styles.highlighted_text} text text_type_digits-large pb-8`}
        >
          {total}
        </p>
      </section>

      <section className={styles.section}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
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
