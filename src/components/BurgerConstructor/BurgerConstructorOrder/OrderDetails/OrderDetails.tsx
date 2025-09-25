import { FC } from "react";
import naming from "../../../../data/ru.json";
import check from "../../../../images/check.svg";
import styles from "./OrderDetails.module.css";

type TProps = {
  orderNumber: number;
};

const OrderDetails: FC<TProps> = ({ orderNumber }) => {
  return (
    <>
      <p
        className={`${styles.orderNumber} text text_type_digits-large mb-8 text-center`}
      >
        {orderNumber}
      </p>
      <p className="mb-15 text-center text text_type_main-medium">
        {naming.OrderDetails.orderNumber}
      </p>
      <img
        src={check}
        className={`${styles.image} mb-15 text-center`}
        alt="Ваш заказ принят"
      />
      <p className="mb-2 text-center text text_type_main-default">
        {naming.OrderDetails.cooking}
      </p>
      <p className="mb-30 text-center text text_type_main-default text_color_inactive">
        {naming.OrderDetails.waiting}
      </p>
    </>
  );
};

export default OrderDetails;
