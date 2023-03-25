import { AppDispatch, RootState } from "@/store/store";
import { SerializedError } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function getErrorFromPayload(payload: any): string {
  const serializedError = payload as SerializedError;
  return serializedError.message as string;
}
