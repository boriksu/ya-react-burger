import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrdersColumn.module.css";

interface TProps {
  orderNumbers: number[];
  linkStyle: string;
}

const OrderColumn: FC<TProps> = ({ orderNumbers, linkStyle }) => {
  const location = useLocation();
  return (
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
};
export default OrderColumn;
