import { useMemo } from "react";
import { useNavigate } from "react-router";
import classnames from "classnames";

import { useAppDispatch, useAppSelector, useModal } from "@app/hooks";
import listImg from "@assets/list.svg";
import { AddNewButton, AddNewForm, Modal } from "@components";
import { projectAdded } from "@features/projects/projects-slice";
import { AddNewFormValue } from "@shared/types";

import styles from "./style.module.scss";

export default function ProjectOrganizer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  const projectNames = useMemo(() => {
    return projects.map((info) => info.name.toLowerCase());
  }, [projects.length]);

  const projectsList =
    !!projects.length &&
    projects.map((projectInfo) => {
      return (
        <li
          key={projectInfo.id}
          className={styles.projectOrganizer__project}
          onClick={() =>
            navigate(
              `/project/${projectInfo.name.replace(/ /g, "-")}`.toLowerCase()
            )
          }
        >
          <img src={listImg} alt="task list" width={50} />
          <h2 className={styles.projectOrganizer__projectTitle}>
            {projectInfo.name}
          </h2>
        </li>
      );
    });

  const addNewProject = ({ name }: AddNewFormValue) => {
    dispatch(
      projectAdded({
        id: crypto.randomUUID(),
        name,
      })
    );

    handleModalClose();
  };

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
        <AddNewForm
          labelText="Название:"
          placeholderText="Введите название"
          buttonText="Добавить"
          existingNames={projectNames}
          onSubmit={addNewProject}
        />
      </Modal>
    </div>
  );
}
