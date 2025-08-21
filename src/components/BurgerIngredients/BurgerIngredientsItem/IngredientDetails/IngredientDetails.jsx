import PropTypes from "prop-types";
import { dataPropTypes } from "../../../../data/dataPropTypes";
import naming from "../../../../data/ru.json";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = ({ item }) => {
  return (
    <>
      <img
        className={`${styles.image} mb-4`}
        src={item.image_large}
        alt={item.name}
      />
      <p
        className={`${styles.name}mb-8 text-center text text_type_main-medium`}
      >
        {item.name}
      </p>
      <div className={`${styles.container} mb-15`}>
        <div className={styles["detail-item"]}>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.calories}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.calories}
          </div>
        </div>
        <div>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.proteins}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.proteins}
          </div>
        </div>
        <div>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.fat}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.fat}
          </div>
        </div>
        <div>
          <div className="mb-2 text text_type_main-default text_color_inactive">
            {naming.IngredientDetails.carbohydrates}
          </div>
          <div className="text-center text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </div>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  item: dataPropTypes.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
