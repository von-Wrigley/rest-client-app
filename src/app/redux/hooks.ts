import { useDispatch, useSelector } from "react-redux";
import type { StoreDispatch } from "./store";
import { RootState } from "./rootReducer";

export const useAppDispatch = () => useDispatch<StoreDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
