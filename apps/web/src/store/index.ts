import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import topicReducer from "./topic/topicSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    topic: topicReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
