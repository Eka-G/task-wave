import styles from "./style.module.scss";

type addNewButtonProps = {
  tipText: string;
  handleClick: () => void;
};

export default function AddNewButton({
  tipText,
  handleClick,
}: addNewButtonProps) {
  return (
    <button
      className={styles.addNewButton}
      title={tipText}
      onClick={handleClick}
    >
      <div className={styles.addNewButton__img}></div>
    </button>
  );
}
