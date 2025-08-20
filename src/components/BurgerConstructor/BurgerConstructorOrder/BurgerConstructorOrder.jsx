import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useState } from "react";
import naming from "../../../data/ru.json";
import Modal from "../../Modal/Modal";
import styles from "./BurgerConstructorOrder.module.css";
import OrderDetails from "./OrderDetails/OrderDetails";

const BurgerConstructorOrder = ({ totalPrice }) => {
  const [isVisible, setIsVisible] = useState(false);

  const changeIsVisible = () => setIsVisible((prev) => !prev);

  return (
    <div className={`${styles.totalPrice} mr-4 mt-10`}>
      <div className="mr-2 mb-1 text text_type_digits-medium">{totalPrice}</div>
      <div className="mr-10">
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" onClick={changeIsVisible}>
        {naming.BurgerConstructorOrder.order}
      </Button>
      {isVisible && (
        <Modal onClose={changeIsVisible}>
          <OrderDetails orderNumber="034536" />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructorOrder.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default BurgerConstructorOrder;
