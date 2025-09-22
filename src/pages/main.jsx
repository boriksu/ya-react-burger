import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import Loader from "../components/Loader/Loader";
import { ingredientsAction } from "../services/actions/ingredients-action";
import styles from "./main.module.css";

const Main = () => {
  const { data, dataLoading, dataErrors } = useSelector(
    (state) => state.loadIngredients
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientsAction());
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
