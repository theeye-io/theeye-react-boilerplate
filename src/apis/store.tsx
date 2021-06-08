import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session/session.slice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: "root",
    storage
};

const perSessionReducer = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
	reducer: {
		session: perSessionReducer,
	},
});

persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export default store;
