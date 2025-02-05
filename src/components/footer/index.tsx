import gitLogo from "@assets/git-hub.svg";
import styles from "./style.module.scss";

export default function Header() {
  return (
    <footer className={styles.footer}>
      <span>pet-project was made by</span>
      <a href="https://github.com/Eka-G" className={styles.footer__link}>
        <img src={gitLogo} className={styles.footer__logo} alt="GitHub" />
      </a>
    </footer>
  );
}
