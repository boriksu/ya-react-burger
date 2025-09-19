import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { URL_PROFILE, URL_ROOT } from "../../data/routes";
import naming from "../../data/ru.json";
import styles from "./AppHeader.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.headerContainer}>
        <nav className={styles.navigation}>
          <div className={styles.navigationItems}>
            <NavigationItem
              url={URL_ROOT}
              icon={BurgerIcon}
              title={naming.AppHeader.constructor}
            />
            <NavigationItem
              url={URL_ROOT}
              icon={ListIcon}
              title={naming.AppHeader.lineOrders}
            />
          </div>
        </nav>

        <div className={styles.logoContainer}>
          <Logo />
        </div>

        <div className={styles.profileSection}>
          <NavigationItem
            url={URL_PROFILE}
            icon={ProfileIcon}
            title={naming.AppHeader.profileSection}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
