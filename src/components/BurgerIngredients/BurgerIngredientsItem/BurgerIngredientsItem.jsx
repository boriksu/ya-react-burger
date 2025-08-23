import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { dataPropTypes } from "../../../data/dataPropTypes";
import naming from "../../../data/ru.json";
import { INGREDIENTS_ACTIONS } from "../../../services/actions/ingredients-action";
import Modal from "../../Modal/Modal";
import styles from "./BurgerIngredientsItem.module.css";
import IngredientDetails from "./IngredientDetails/IngredientDetails";

const BurgerIngredientItem = ({ ingredient, count }) => {
  const displayedIngredient = useSelector(
    (state) => state.ingredientWindow.displayedIngredient
  );

  const dispatch = useDispatch();

  function showIngredientDetails() {
    dispatch({ type: INGREDIENTS_ACTIONS.SHOW_DETAILS, item: ingredient });
  }
  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  function hideIngredientDetails(e) {
    dispatch({ type: INGREDIENTS_ACTIONS.SHOW_DETAILS, item: null });
    e.stopPropagation();
  }

  return (
    <li
      className={`${styles.container} mt-6 mb-8 ml-3 mr-2`}
      onClick={showIngredientDetails}
      ref={dragRef}
    >
      <img
        className={`${styles.image} ml-4 mr-4 mb-1`}
        src={ingredient.image}
        alt={ingredient.name}
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
      {count > 0 && (
        <Counter count={count} size="default" extraClass={styles.count} />
      )}
      {displayedIngredient && (
        <Modal
          title={naming.IngredientDetails.title}
          onClose={hideIngredientDetails}
        >
          <IngredientDetails item={displayedIngredient} />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredientItem.propTypes = {
  ingredient: dataPropTypes.isRequired,
  count: PropTypes.number,
};

export default React.memo(BurgerIngredientItem);
