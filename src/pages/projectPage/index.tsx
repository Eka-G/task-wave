import { Suspense } from "react";
import { useLocation } from "react-router";

import { Loading, TaskTracker } from "@components";
import Layout from "@layout";

import styles from "./style.module.scss";

export default function ProjectPage() {
  const location = useLocation();
  const projectName = location.pathname
    .split("/")[2]
    .replace("-", " ")
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <Layout>
      <section className={styles.project}>
        <h1>{projectName}</h1>
        <div className={styles.project__content}>
          <Suspense fallback={<Loading />}>
            <TaskTracker />
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}
