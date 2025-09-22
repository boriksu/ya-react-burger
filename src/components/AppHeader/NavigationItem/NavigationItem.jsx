import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./NavigationItem.module.css";

const NavigationItem = ({ icon: Icon, title, url }) => {
  return (
    <NavLink to={url} className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default ml-2 ${
              isActive ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
};

NavigationItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavigationItem;
