import { useEffect } from "react";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import Loader from "../components/Loader/Loader";
import { ingredientsAction } from "../services/actions/ingredients-action";
import { useDispatch, useSelector } from "../services/hook";
import styles from "./main.module.css";

import { getIngredients } from "../services/selectors";

const Main = () => {
  const { data, dataLoading, dataErrors } = useSelector(getIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientsAction() as any);
  }, [dispatch]);

  return (
    <>
      {dataLoading || dataErrors ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <>
          <main className={styles.container}>
            <div className={styles.content}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </>
      ) : undefined}
    </>
  );
};

export default Main;
