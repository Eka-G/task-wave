import { STORAGE_KEY_NAME } from "@/shared/conatants";
import { startAppListening } from "./listenerMiddleware";

startAppListening({
  predicate: () => true,
  effect: (_, listenerApi) => {
    try {
      const state = listenerApi.getState();

      localStorage.setItem(
        STORAGE_KEY_NAME,
        JSON.stringify(state.projects.projects)
      );
    } catch (error) {
      throw new Error(
        `Ошибка при сохранении в localStorage: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  },
});
