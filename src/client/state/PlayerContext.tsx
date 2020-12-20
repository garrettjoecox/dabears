/* eslint-disable no-param-reassign */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import React, { FC, useMemo, useReducer } from 'react';
import type tracks from '../../../public/tracks.json';

type Track = typeof tracks[number];

type PlayerContextState = {
  state: 'playing' | 'paused' | 'empty';
  track: Track | null;
  audioApi: HTMLAudioElement | null;
};

const initialPlayerContextState: PlayerContextState = {
  state: 'empty',
  track: null,
  audioApi: null,
};

const playerSlice = createSlice({
  name: 'player',
  reducers: {
    setTrack: (state, action: PayloadAction<Track>) => {
      state.audioApi?.play();
      state.track = action.payload;
    },
    setAudioApi: (state, action: PayloadAction<HTMLAudioElement>) => {
      // @ts-ignore
      state.audioApi = action.payload;
    },
  },
  initialState: initialPlayerContextState,
});

export const { setTrack, setAudioApi } = playerSlice.actions;
const playerReducer = playerSlice.reducer;

export const PlayerContext = React.createContext<{
  state: PlayerContextState;
  dispatch: React.Dispatch<AnyAction>;
}>(undefined as any);

export const PlayerProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerContextState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};
