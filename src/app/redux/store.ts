import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contentReducer from "./ContentSelected";
import type { RootState } from "./types";

const rootReducer = combineReducers({
  selected: contentReducer,
});

export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
