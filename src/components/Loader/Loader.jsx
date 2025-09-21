import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <main className={styles.loading}>
      <p className="text text_type_main-large">LOADING...</p>
    </main>
  );
};

export default Loader;
