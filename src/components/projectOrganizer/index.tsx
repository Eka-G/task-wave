import classnames from "classnames";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import listImg from "@assets/list.svg";
import { AddNewButton } from "@components";
import { projectAdded } from "@features/projects/projects-slice";
import { Project } from "@shared/types";

import styles from "./style.module.scss";

export default function ProjectOrganizer() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);

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

  const mockPr: Project = {
    id: 2,
    name: "Тестовый проект 2",
    taskList: [
      {
        id: 2,
        sequenceNumber: 2,
        name: "Тестовая задача 2",
        creationDate: new Date(),
        deadlineDate: new Date(),
        status: "created",
      },
    ],
  };

  const clickHandler = () => {
    dispatch(projectAdded(mockPr));
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
          <AddNewButton tipText="Добавить проект" handleClick={clickHandler} />
        </li>
      </ul>
    </div>
  );
}
