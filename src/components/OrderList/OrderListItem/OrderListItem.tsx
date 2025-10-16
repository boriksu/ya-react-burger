import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getIngredients } from "../../../services/selectors";

import { TIngredient, TOrder } from "../../../data/types/types";
import styles from "./OrderListItem.module.css";

interface TProps {
  order: TOrder;
  isPerson?: boolean;
}

const OrdersListItem: FC<TProps> = ({ order, isPerson = false }) => {
  const location = useLocation();
  const { data } = useSelector(getIngredients);
  const limitCount = 5;

  const orderStatus = useMemo(() => {
    switch (order.status) {
      case "done":
        return "Выполнен";
      case "created":
        return "Создан";
      default:
        return "Готовится";
    }
  }, [order.status]);

  const orderColor = useMemo(
    () =>
      order.status === "done" ? styles.status_done : styles.status_default,
    [order.status]
  );

  const orderIngredients = useMemo(
    () =>
      order.ingredients
        .map((elemId: string) =>
          data.find((elem: TIngredient) => elem._id === elemId)
        )
        .filter(Boolean) as TIngredient[],
    [data, order.ingredients]
  );

  const orderTotal = useMemo(
    () =>
      orderIngredients.reduce(
        (sum: number, elem: TIngredient) => elem.price + sum,
        0
      ),
    [orderIngredients]
  );

  const limitItems = useMemo(
    () => orderIngredients.slice(0, limitCount),
    [orderIngredients]
  );

  const hideCount = orderIngredients.length - limitCount;

  return (
    <Link
      className={styles.order}
      to={`${location.pathname}/${order.number}`}
      state={{ location }}
    >
      <div className="m-6">
        <div className={styles.order_header}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
      </div>

      <p className={`${styles.title_order} text text_type_main-medium`}>
        {order.name}
      </p>

      {isPerson && (
        <p
          className={`${styles.status_order} ${orderColor} text text_type_main-default`}
        >
          {orderStatus}
        </p>
      )}

      <div className={styles.filling}>
        <ul className={styles.images_selection}>
          {limitItems.map((item, index) => (
            <li
              key={index}
              style={{ marginRight: -20 }}
              className={styles.image_fill}
            >
              <img
                style={{
                  opacity: index === limitCount - 1 && hideCount > 0 ? 0.4 : 1,
                }}
                src={item.image_mobile}
                alt={item.name}
                className={styles.image_position}
              />
              {hideCount > 0 && index === limitCount - 1 && (
                <span
                  className={`${styles.count_hidden} text text_type_main-default`}
                >
                  +{hideCount}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <span className="text text_type_digits-default">{orderTotal}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrdersListItem;
