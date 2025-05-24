import { configureStore } from "@reduxjs/toolkit";
import rootApi from "../services/rootService";

/**
 * @description Configures the Redux store with root reducer and middleware.
 * Includes middleware for RTK Query API (employeeApi).
 */
export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

/**
 * @description Type representing the overall Redux state.
 * Use this type for typed `useSelector` hooks.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @description Type representing the app's dispatch function.
 * Use this type for typed `useDispatch` hooks.
 */
export type AppDispatch = typeof store.dispatch;
