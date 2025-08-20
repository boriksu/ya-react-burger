import PropTypes from "prop-types";
import { useMemo, useRef } from "react";
import { dataPropTypes } from "../../data/dataPropTypes";
import naming from "../../data/ru.json";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsItem from "./BurgerIngredientsItem/BurgerIngredientsItem";
import BurgerIngredientsTabs from "./BurgerIngredientsTabs/BurgerIngredientsTabs";

const INGREDIENT_TYPES = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

const BurgerIngredients = ({ data }) => {
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
    sectionRefs.current[type]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section style={{ flex: "0 0 600px" }}>
      <h1 className="mt-10 mb-5 text text_type_main-large">
        {naming.BurgerIngredients.combine}
      </h1>
      <BurgerIngredientsTabs handleTabChange={handleTabChange} />
      <div className={styles.scrollBar}>
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
                  count={index === 0 ? 1 : 0}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
