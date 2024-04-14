import { configureStore, combineReducers, UnknownAction} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import hospitalReducer from './hospitalSlice.ts';
import checkedInReducer from './checkedInSlice.ts';
import roleReducer from './roleSlice.ts';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const appReducer = combineReducers({
    hospital: hospitalReducer,
    checkedIn: checkedInReducer,
    role: roleReducer,
});

// @ts-ignore
const rootReducer = (state, action) => {
    if (action.type === 'reset') {
        state = undefined;
    }
    return appReducer(state, action);
};


const persistConfig = {
    key: 'root',
    storage,
    // Add any additional configuration options here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
