import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./ContentSelected";

export const store = () =>
  configureStore({
    reducer: {
      selected: contentReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
