import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import hospitalReducer from './hospitalSlice.ts';
import checkedInReducer from './checkedInSlice.ts';

const persistConfig = {
    key: 'root',
    storage,
    // Add any additional configuration options here
};

const persistedReducer = persistReducer(persistConfig, hospitalReducer);
const persistedCheckedInReducer = persistReducer(persistConfig, checkedInReducer);

export const store = configureStore({
    reducer: {
        hospital: persistedReducer,
        checkedIn: persistedCheckedInReducer,
    },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
