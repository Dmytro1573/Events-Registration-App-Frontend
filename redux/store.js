import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events/slice"; // Імпорт редьюсера для подій

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    events: eventsReducer, // Редьюсер для подій
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Для роботи з redux-persist
      },
    }),
});

// Якщо використовуєш persist, експортуємо persistor
export const persistor = persistStore(store);
