// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import usersReducer, { reset as resetUsers } from "../Features/UserSlice";
import postsReducer, { reset as resetPosts } from "../Features/PostSlice";
import adminsReducer, { reset as resetAdmins } from "../Features/AdminSlice";

// Redux Persist configuration
const persistConfig = {
  key: "reduxstore",
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  admins: adminsReducer,
});

// Persisted reducer setup
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor instance for redux-persist
const persistor = persistStore(store);

// Function to reset the entire store slices
const resetStore = () => {
  store.dispatch(resetUsers());
  store.dispatch(resetPosts());
  store.dispatch(resetAdmins());
};

export { store, persistor, resetStore };
