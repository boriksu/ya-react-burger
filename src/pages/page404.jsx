import naming from "../data/ru.json";
import styles from "./page.module.css";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <p className={`${styles.content} text text_type_main-medium`}>
        {naming.Pade404.error}
      </p>
    </div>
  );
};

export default Page404;
