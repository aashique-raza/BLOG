import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userFeature/userSlice";
import ThemeReducer from "../features/Theme/ThemeSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  theme:ThemeReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store
