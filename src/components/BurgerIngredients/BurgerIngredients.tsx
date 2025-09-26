import { FC, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { URL_ROOT } from "../../data/routes";
import naming from "../../data/ru.json";
import { TAB_ACTIONS } from "../../services/actions/index";
import { INGREDIENTS_ACTIONS } from "../../services/actions/ingredients-action";
import {
  getConstructor,
  getDisplayedIngredient,
  getIngredients,
  getTab,
} from "../../services/selectors";
import Modal from "../Modal/Modal";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsItem from "./BurgerIngredientsItem/BurgerIngredientsItem";
import IngredientDetails from "./BurgerIngredientsItem/IngredientDetails/IngredientDetails";
import BurgerIngredientsTabs from "./BurgerIngredientsTabs/BurgerIngredientsTabs";

import { INGREDIENT_TYPES } from "../../data/ingredientType";
import { TIngredient } from "../../data/types/types";

const BurgerIngredients: FC = () => {
  const { data } = useSelector(getIngredients);
  const tab = useSelector(getTab);
  const { bun, ingredients } = useSelector(getConstructor);
  const displayedIngredient = useSelector(getDisplayedIngredient);

  const ingredientsCount = useMemo(() => {
    const countMap: Record<string, number> = {};

    if (bun) {
      countMap[bun._id] = 2;
    }

    ingredients.forEach((ingredient: TIngredient) => {
      countMap[ingredient._id] = (countMap[ingredient._id] || 0) + 1;
    });

    return countMap;
  }, [bun, ingredients]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    [INGREDIENT_TYPES.BUN]: null,
    [INGREDIENT_TYPES.SAUCE]: null,
    [INGREDIENT_TYPES.MAIN]: null,
  });

  const typeIngredients = useMemo(() => {
    return Object.values(INGREDIENT_TYPES).reduce(
      (acc: Record<string, TIngredient[]>, type) => {
        acc[type] = data.filter(
          (ingredient: TIngredient) => ingredient.type === type
        );
        return acc;
      },
      {}
    );
  }, [data]);

  const handleTabChange = (type: string) => {
    const ref = sectionRefs.current[type];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      let closestTab = tab;
      let minDistance = Infinity;

      Object.entries(sectionRefs.current).forEach(([type, ref]) => {
        if (ref) {
          const distance = Math.abs(scrollTop - ref.offsetTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestTab = type;
          }
        }
      });

      if (tab !== closestTab) {
        dispatch({ type: TAB_ACTIONS.CHANGE_TAB, tab: closestTab });
      }
    },
    [tab, dispatch]
  );

  const hideIngredientDetails = useCallback(
    (e?: KeyboardEvent) => {
      navigate(URL_ROOT, { replace: true });
      dispatch({ type: INGREDIENTS_ACTIONS.SHOW_DETAILS, item: null });
      if (e) {
        e.stopPropagation();
      }
    },
    [dispatch, navigate]
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
      {displayedIngredient && (
        <Modal
          title={naming.IngredientDetails.title}
          onClose={hideIngredientDetails}
        >
          <IngredientDetails item={displayedIngredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
