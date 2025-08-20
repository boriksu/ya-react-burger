import PropTypes from "prop-types";
import naming from "../../../../data/ru.json";

const OrderDetails = ({ orderNumber }) => {
  return (
    <>
      <p className="mb-8 text text_type_digits-large">{orderNumber}</p>
      <p className="mb-15 text-center text text_type_main-medium">
        {naming.OrderDetails.orderNumber}
      </p>
      <p className="mb-2 text-center text text_type_main-default">
        {naming.OrderDetails.cooking}
      </p>
      <p className="mb-30 text-center text text_type_main-default text_color_inactive">
        {naming.OrderDetails.waiting}
      </p>
    </>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
