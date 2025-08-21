import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { dataPropTypes } from "../../../data/dataPropTypes";
import naming from "../../../data/ru.json";
import Modal from "../../Modal/Modal";
import styles from "./BurgerIngredientsItem.module.css";
import IngredientDetails from "./IngredientDetails/IngredientDetails";

const BurgerIngredientItem = ({ ingredient, count }) => {
  const [isVisible, setIsVisible] = useState(false);

  const changeIsVisible = (e) => {
    setIsVisible((prev) => !prev);
    e.stopPropagation();
  };

  return (
    <li
      className={`${styles.container} mt-6 mb-8 ml-3 mr-2`}
      onClick={changeIsVisible}
    >
      <img
        className={`${styles.image} ml-4 mr-4 mb-1`}
        src={ingredient.image}
        alt="Изображение ингредиента"
      />
      <div className={`${styles.price} mb-1`}>
        <span className="mr-2 text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </div>
      {count && count > 0 ? (
        <Counter count={count} size="default" extraClass={styles.count} />
      ) : undefined}
      {isVisible && (
        <Modal title={naming.IngredientDetails.title} onClose={changeIsVisible}>
          <IngredientDetails item={ingredient} />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredientItem.propTypes = {
  ingredient: dataPropTypes.isRequired,
  count: PropTypes.number,
};

export default BurgerIngredientItem;
