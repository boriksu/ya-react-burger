import { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import naming from "../../../../data/ru.json";
import { TIngredient } from "../../../../data/types/types";
import { ingredientsAction } from "../../../../services/actions/ingredients-action";
import Loader from "../../../Loader/Loader";
import styles from "./IngredientDetails.module.css";

import { getIngredients } from "../../../../services/selectors";

type TProps = {
  item?: TIngredient;
};

const IngredientDetails: FC<TProps> = ({ item }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { data, dataLoading, dataErrors } = useSelector(getIngredients);

  const currentItem = useMemo(() => {
    if (item) {
      return item;
    } else if (params.id && data && data.length > 0) {
      return data.find(
        (ingredient: TIngredient) => ingredient._id === params.id
      );
    }
    return null;
  }, [item, params.id, data]);

  useEffect(() => {
    if (!currentItem && !dataLoading && !dataErrors && params.id) {
      dispatch(ingredientsAction() as any);
    }
  }, [currentItem, dataLoading, dataErrors, params.id, dispatch]);

  if (!currentItem) {
    return <Loader />;
  }

  return (
    <>
      <img
        className={`${styles.image} mb-4`}
        src={currentItem.image_large}
        alt={currentItem.name}
      />
      <p
        className={`${styles.name} mb-8 text-center text text_type_main-medium`}
      >
        {currentItem.name}
      </p>
      <div className={`${styles.container} mb-15`}>
        <div className={styles["container-item"]}>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.calories}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {currentItem.calories}
          </div>
        </div>
        <div className={styles["container-item"]}>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.proteins}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {currentItem.proteins}
          </div>
        </div>
        <div className={styles["container-item"]}>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.fat}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {currentItem.fat}
          </div>
        </div>
        <div className={styles["container-item"]}>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.carbohydrates}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {currentItem.carbohydrates}
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
