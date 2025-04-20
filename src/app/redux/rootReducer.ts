import { combineReducers } from "@reduxjs/toolkit";
import contentReducer from "./ContentSelected";

export const rootReducer = combineReducers({
  selected: contentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
