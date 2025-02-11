import errorImg from "@assets/sad-icon.svg";
import Layout from "@layout";

import styles from "./style.module.scss";

export default function ErrorPage() {
  return (
    <Layout>
      <section>
        <h1>Error</h1>
        <div className={styles.errorContent}>
          <img
            src={errorImg}
            width="80"
            alt="Ошибка"
            className={styles.errorContent__img}
          />
          <p>Страница не найдена!</p>
        </div>
      </section>
    </Layout>
  );
}
