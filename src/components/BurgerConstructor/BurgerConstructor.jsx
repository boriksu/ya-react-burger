import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import naming from "../../data/ru.json";
import { CONSTRUCTOR_ACTIONS } from "../../services/actions/index";

import { INGREDIENT_TYPES } from "../../data/ingredientType";
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorIngredient from "./BurgerConstructorIngredient/BurgerConstructorIngredient";
import BurgerConstructorOrder from "./BurgerConstructorOrder/BurgerConstructorOrder";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const totalPrice = useMemo(() => {
    let price = 0;
    if (bun) {
      price += bun.price * 2;
    }
    price += ingredients.reduce((sum, item) => sum + item.price, 0);
    return price;
  }, [bun, ingredients]);

  const [, dropTargetBunUp] = useDrop({
    accept: INGREDIENT_TYPES.BUN,
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.SELECT_BUN, item: item });
    },
  });

  const [, dropTargetBunDown] = useDrop({
    accept: INGREDIENT_TYPES.BUN,
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.SELECT_BUN, item: item });
    },
  });

  const [, dropTargetIngredient] = useDrop({
    accept: [INGREDIENT_TYPES.SAUCE, INGREDIENT_TYPES.MAIN],
    drop(item) {
      dispatch({ type: CONSTRUCTOR_ACTIONS.ADD_INGREDIENT, item: item });
    },
  });

  const removeIngredient = useCallback(
    (index) => {
      dispatch({ type: CONSTRUCTOR_ACTIONS.REMOVE_INGREDIENT, index: index });
    },
    [dispatch]
  );

  return (
    <section className={styles.container}>
      <div className="mt-25 ml-4">
        <div ref={dropTargetBunUp}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div
              className={`${styles.addElement} constructor-element constructor-element_pos_top ml-8`}
            >
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addBun}
              </div>
            </div>
          )}
        </div>
        <ul className={`${styles.scroll} mt-4 mb-4`} ref={dropTargetIngredient}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <BurgerConstructorIngredient
                key={ingredient.id}
                item={ingredient}
                index={index}
                onRemove={removeIngredient}
              />
            ))
          ) : (
            <div className={`${styles.addElement} constructor-element ml-8`}>
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addIngredient}
              </div>
            </div>
          )}
        </ul>
        <div ref={dropTargetBunDown}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`${styles.ingredient} ml-8`}
            />
          ) : (
            <div
              className={`${styles.addElement} constructor-element constructor-element_pos_bottom ml-8`}
            >
              <div className={`${styles.add} text text_type_main-default`}>
                {naming.BurgerConstructor.addBun}
              </div>
            </div>
          )}
        </div>
      </div>

      <BurgerConstructorOrder totalPrice={totalPrice} />
    </section>
  );
};

export default BurgerConstructor;
