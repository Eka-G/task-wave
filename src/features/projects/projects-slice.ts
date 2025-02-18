import { BaseInfo, Project, TaskStatus } from "@shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsState = {
  projects: Project[] | [];
};

type TaskAddPayload = BaseInfo & {
  projectId: string;
};

const initialState: ProjectsState = {
  projects: [],
};

const CREATED_STATUS: TaskStatus = "created";

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
  },
});

export const { projectAdded, taskAdded } = projectSlice.actions;
export default projectSlice.reducer;
