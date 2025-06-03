import { configureStore } from "@reduxjs/toolkit";
import apiChoiceReducer from "./apiSlice";

export const store = configureStore({
  reducer: {
    api: apiChoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
