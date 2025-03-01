import { Suspense, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import { useAppDispatch, useAppSelector, useModal } from "@app/hooks";
import { AddNewForm, Loading, Modal, TaskTracker } from "@components";
import { taskAdded } from "@features/projects/projects-slice";
import Layout from "@layout";
import { AddNewFormValue } from "@shared/types";

import styles from "./style.module.scss";

export default function ProjectPage() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const navigate = useNavigate();
  const { name: nameFromUrl } = useParams();

  const currentProject = useMemo(() => {
    if (!nameFromUrl) {
      return null;
    }

    return projects.find(
      (item) =>
        item.name.toLowerCase() === nameFromUrl.replace(/-/g, " ").toLowerCase()
    );
  }, [projects, nameFromUrl]);

  if (!currentProject) {
    navigate("/404");

    return null;
  }

  const taskList = useMemo(
    () => currentProject.taskList,
    [currentProject.taskList]
  );

  const addNewTask = ({ name }: AddNewFormValue) => {
    if (currentProject) {
      dispatch(
        taskAdded({
          projectId: currentProject.id,
          id: crypto.randomUUID(),
          name,
        })
      );
    }

    handleModalClose();
  };

  return (
    <Layout>
      <section className={styles.project}>
        <div className={styles.project__header}>
          <h1 className={styles.project__title}>{currentProject.name}</h1>
          <button
            className={styles.project__addButton}
            onClick={handleModalOpen}
          >
            Добавить задачу
          </button>
        </div>

        <div className={styles.project__content}>
          <Suspense fallback={<Loading />}>
            <TaskTracker taskList={taskList} projectId={currentProject.id} />
          </Suspense>
        </div>
      </section>

      <Modal isOpen={isModalOpen} title="В очередь" onClose={handleModalClose}>
        <AddNewForm
          labelText="Задача:"
          placeholderText="Введите текст задачи"
          buttonText="Добавить"
          maxFieldLength={80}
          onSubmit={addNewTask}
        />
      </Modal>
    </Layout>
  );
}
