import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@features/projects/projects-slice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: { projects: projectsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
