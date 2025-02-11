import { ProjectOrganizer } from "@components";
import Layout from "@layout";

import styles from "./style.module.scss";

export default function HomePage() {
  return (
    <Layout>
      <section className={styles.home}>
        <h1>Добро пожаловать в TaskWave!</h1>
        <p className={styles.home__text}>
          <strong>TaskWave</strong> — это ваше идеальное решение для управления
          задачами. Организуйте, отслеживайте и завершайте ваши дела с
          легкостью. Создавайте списки задач, добавляйте описания, отслеживайте
          выполнение. TaskWave помогает вам оставаться продуктивными и
          организованными, не упуская ничего важного.
        </p>

        <ProjectOrganizer />
      </section>
    </Layout>
  );
}
