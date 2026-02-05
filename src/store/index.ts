import { configureStore } from '@reduxjs/toolkit';
import nftsReducer from './nftsSlice';

export const store = configureStore({
  reducer: {
    nfts: nftsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
