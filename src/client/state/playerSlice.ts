/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      state.track = action.payload;
      state.audioApi?.load();
      state.audioApi?.play();
    },
    setAudioApi: (state, action: PayloadAction<HTMLAudioElement>) => {
      // @ts-ignore
      state.audioApi = action.payload;
    },
  },
  initialState: initialPlayerContextState,
});

export const { setTrack, setAudioApi } = playerSlice.actions;
export default playerSlice.reducer;
