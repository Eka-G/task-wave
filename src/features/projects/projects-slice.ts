import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseInfo, Project, TaskStatus } from "@shared/types";

type ProjectsState = {
  projects: Project[] | [];
};

type TaskAddPayload = BaseInfo & {
  projectId: string;
};

type TaskStatusChangedPayload = {
  projectId: string;
  taskId: string;
  prevStatus: TaskStatus;
  newStatus: TaskStatus;
};

const initialState: ProjectsState = {
  projects: [],
};

const CREATED_STATUS: TaskStatus = "inLine";

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectAdded(state, action: PayloadAction<Project>) {
      state.projects = [...state.projects, action.payload];
    },

    taskAdded(state, action: PayloadAction<TaskAddPayload>) {
      const { projectId, id, name } = action.payload;
      const newTask = {
        id,
        name,
        creationDate: new Date(),
        status: CREATED_STATUS,
      };

      state.projects = state.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            taskList: {
              ...project.taskList,
              inLine: [...project.taskList.inLine, newTask],
            },
          };
        }

        return project;
      });
    },

    taskStatusChanged(state, action: PayloadAction<TaskStatusChangedPayload>) {
      const { projectId, taskId, prevStatus, newStatus } = action.payload;

      state.projects = state.projects.map((project) => {
        if (project.taskList[newStatus] && project.id === projectId) {
          const prevTaskList = [...project.taskList[prevStatus]];
          const newProjectList = [...project.taskList[newStatus]];
          const changedTaskIndex = prevTaskList.findIndex(
            (task) => task.id === taskId
          );

          if (changedTaskIndex >= 0) {
            const [taskToMove] = prevTaskList.splice(changedTaskIndex, 1);
            newProjectList.push({
              ...taskToMove,
              status: newStatus,
            });
          }

          return {
            ...project,
            taskList: {
              ...project.taskList,
              [prevStatus]: prevTaskList,
              [newStatus]: newProjectList,
            },
          };
        }

        return project;
      });
    },
  },
});

export const { projectAdded, taskAdded, taskStatusChanged } =
  projectSlice.actions;
export default projectSlice.reducer;
