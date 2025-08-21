import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
              url="/"
              icon={BurgerIcon}
              isActive
              title={naming.AppHeader.constructor}
            />
            <NavigationItem
              url="/"
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
            url="/"
            icon={ProfileIcon}
            title={naming.AppHeader.profileSection}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
