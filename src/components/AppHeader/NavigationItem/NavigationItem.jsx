import PropTypes from "prop-types";

const NavigationItem = ({ isActive, icon: Icon, title, url }) => {
  const iconCurrentStyle = isActive ? "primary" : "secondary";
  const textCurrentStyle = isActive
    ? "text_color_primary"
    : "text_color_inactive";
  return (
    <a
      href={url}
      style={{ display: "flex", textDecoration: "none" }}
      className="pt-4 pr-5 pb-4 pl-5"
    >
      <Icon type={iconCurrentStyle} />
      <span className={`text text_type_main-default ml-2 ${textCurrentStyle}`}>
        {title}
      </span>
    </a>
  );
};

NavigationItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavigationItem;
