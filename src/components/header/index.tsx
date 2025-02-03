import logo from "/logo.svg";
import styles from "./style.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.header__link}>
        <img src={logo} className={styles.header__logo} alt="logo" />
      </a>
    </header>
  );
}
