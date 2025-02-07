import { ReactNode } from "react";
import styles from "./style.module.scss";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={(event) => handleClick(event)}>
      <div className={styles.modal}>
        <button className={styles.modal__closeButton} onClick={onClose} />

        <div className={styles.modal__body}>
          <h2 className={styles.modal__title}>{title}</h2>
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
