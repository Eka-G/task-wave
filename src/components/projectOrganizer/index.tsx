import classnames from "classnames";

import { useAppSelector, useModal } from "@app/hooks";
import listImg from "@assets/list.svg";
import { AddNewButton, AddProjectForm, Modal } from "@components";

import styles from "./style.module.scss";

export default function ProjectOrganizer() {
  const { projects } = useAppSelector((state) => state.projects);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const projectsList =
    !!projects.length &&
    projects.map((projectInfo) => {
      return (
        <li className={styles.projectOrganizer__project}>
          <img src={listImg} alt="task list" width={50} />
          <h2 className={styles.projectOrganizer__projectTitle}>
            {projectInfo.name}
          </h2>
        </li>
      );
    });

  return (
    <div className={styles.projectOrganizer}>
      {!projects.length && (
        <p className={styles.projectOrganizer__text}>
          Присоединяйтесь к нам и добавьте свой первый проект!
        </p>
      )}

      <ul
        className={classnames({
          [styles.projectOrganizer__projectList]: !!projects.length,
        })}
      >
        {projectsList}

        <li className={styles.projectOrganizer__addButton}>
          <AddNewButton
            tipText="Добавить проект"
            handleClick={handleModalOpen}
          />
        </li>
      </ul>

      <Modal
        isOpen={isModalOpen}
        title="Добавить проект"
        onClose={handleModalClose}
      >
        <AddProjectForm onSubmit={handleModalClose} />
      </Modal>
    </div>
  );
}
