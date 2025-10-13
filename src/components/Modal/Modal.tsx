import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

type TProps = {
  title?: string;
  children: React.ReactElement;
  onClose: (e?: KeyboardEvent) => void;
};

const Modal: FC<TProps> = ({ title, children, onClose }) => {
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(e);
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey, false);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey, false);
    };
  }, [handleEscapeKey]);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.headerTitle} ml-10 mt-10 mr-10`}>
          <div className={`${styles.title} text text_type_main-large`}>
            {title}
          </div>
          <div className={styles.btn}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
