import { authApi } from "../services/auth";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/auth/authSlice";
import topicReducer from "@/store/topic/topicSlice";
import { topicApi } from "@/services/topic";

const store = configureStore({
  reducer: {
    auth: authReducer,
    topic: topicReducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      topicApi.middleware,
      authApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
