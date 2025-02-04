import { Project } from "@shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsState = {
  projects: Project[] | [];
};

const initialState: ProjectsState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectAdded(state, action: PayloadAction<Project>) {
      state.projects = [...state.projects, action.payload];
    },
  },
});

export const { projectAdded } = projectSlice.actions;
export default projectSlice.reducer;
