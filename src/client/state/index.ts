import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export default store;

export type AppDispatch = typeof import('@/client/state').default['dispatch'];

export type AppState = ReturnType<typeof import('@/client/state/rootReducer').default>;
