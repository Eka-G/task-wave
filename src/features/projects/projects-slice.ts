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
  status: TaskStatus;
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

      state.projects = state.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            taskList: [
              ...(project.taskList || []),
              {
                id,
                name,
                creationDate: new Date(),
                status: CREATED_STATUS,
              },
            ],
          };
        }

        return project;
      });
    },

    taskStatusChanged(state, action: PayloadAction<TaskStatusChangedPayload>) {
      const { projectId, taskId, status } = action.payload;
      state.projects = state.projects.map((project) => {
        if (project.taskList && project.id === projectId) {
          const newProjectList = project.taskList.map((task) => {
            if (task.id === taskId && task.status !== status) {
              return { ...task, status };
            }

            return task;
          });

          return {
            ...project,
            taskList: newProjectList,
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
