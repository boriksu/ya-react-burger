import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import naming from "../../data/ru.json";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsItem from "./BurgerIngredientsItem/BurgerIngredientsItem";
import BurgerIngredientsTabs from "./BurgerIngredientsTabs/BurgerIngredientsTabs";

import { TAB_ACTIONS } from "../../services/actions/index";

import { INGREDIENT_TYPES } from "../../data/ingredientType";

const BurgerIngredients = () => {
  const { data } = useSelector((state) => state.loadIngredients);
  const tab = useSelector((state) => state.tabInfo.tab);
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const ingredientsCount = useMemo(() => {
    const countMap = {};

    if (bun) {
      countMap[bun._id] = 2;
    }

    ingredients.forEach((ingredient) => {
      countMap[ingredient._id] = (countMap[ingredient._id] || 0) + 1;
    });

    return countMap;
  }, [bun, ingredients]);

  const dispatch = useDispatch();

  const sectionRefs = useRef({
    [INGREDIENT_TYPES.BUN]: null,
    [INGREDIENT_TYPES.SAUCE]: null,
    [INGREDIENT_TYPES.MAIN]: null,
  });

  const typeIngredients = useMemo(() => {
    return Object.values(INGREDIENT_TYPES).reduce((acc, type) => {
      acc[type] = data.filter((ingredient) => ingredient.type === type);
      return acc;
    }, {});
  }, [data]);

  const handleTabChange = (type) => {
    const ref = sectionRefs.current[type];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = useCallback(
    (e) => {
      const scrollTop = e.currentTarget.scrollTop;
      let closestTab = tab;
      let minDistance = Infinity;

      // Ищем ближайшую секцию
      Object.entries(sectionRefs.current).forEach(([type, ref]) => {
        if (ref) {
          const distance = Math.abs(scrollTop - ref.offsetTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestTab = type;
          }
        }
      });

      // Обновляем таб если нужно
      if (tab !== closestTab) {
        dispatch({ type: TAB_ACTIONS.CHANGE_TAB, tab: closestTab });
      }
    },
    [tab, dispatch]
  );

  return (
    <section className={styles.container}>
      <h1 className="mt-10 mb-5 text text_type_main-large">
        {naming.BurgerIngredients.combine}
      </h1>
      <BurgerIngredientsTabs handleTabChange={handleTabChange} />
      <div className={styles.scrollBar} onScroll={handleScroll}>
        {Object.entries(INGREDIENT_TYPES).map(([key, type]) => (
          <section key={type} ref={(el) => (sectionRefs.current[type] = el)}>
            <h2 className="mt-2 text text_type_main-medium">
              {naming.BurgerIngredients[type]}
            </h2>
            <ul className={styles.listIngridients}>
              {typeIngredients[type].map((ingredient, index) => (
                <BurgerIngredientsItem
                  key={`${ingredient._id}`}
                  ingredient={ingredient}
                  count={ingredientsCount[ingredient._id]}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
