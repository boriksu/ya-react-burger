import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationItem.module.css";

type TProps = {
  icon: FC<TIconProps>;
  title: string;
  url: string;
};

const NavigationItem: FC<TProps> = ({ icon: Icon, title, url }) => {
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
export default NavigationItem;
