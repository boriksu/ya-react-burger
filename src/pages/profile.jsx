import { NavLink, Outlet } from "react-router-dom";
import { URL_PROFILE_LOGOUT, URL_PROFILE_ORDERS } from "../data/routes";
import naming from "../data/ru.json";
import styles from "./page.module.css";

const Profile = () => {
  const navLinkClass = ({ isActive }) =>
    `text text_type_main-medium ${
      isActive ? "text_color_primary" : "text_color_inactive"
    }`;

  return (
    <main className={`${styles.container} ${styles.containerProfile} `}>
      <div className={styles.containerProfileContent}>
        <nav className={`${styles.menu} ml-5 mr-15 `}>
          <ul>
            <li>
              <NavLink to="" end className={navLinkClass}>
                {naming.Profile.profile}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_ORDERS} className={navLinkClass}>
                {naming.Profile.history}
              </NavLink>
            </li>
            <li>
              <NavLink to={URL_PROFILE_LOGOUT} className={navLinkClass}>
                {naming.Profile.exit}
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            {naming.Profile.changeProfileData}
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
};

export default Profile;
