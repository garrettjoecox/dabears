/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tracksSource from '../../../public/tracks.json';

type PlayerContextState = {
  track: number;
};

const initialPlayerContextState: PlayerContextState = {
  track: 0,
};

const playerSlice = createSlice({
  name: 'player',
  reducers: {
    setTrack: (state, action: PayloadAction<number>) => {
      state.track = action.payload;
    },
    nextTrack: (state) => {
      state.track = (state.track + 1) % tracksSource.length;
    },
    prevTrack: (state) => {
      state.track = (state.track - 1 + tracksSource.length) % tracksSource.length;
    },
  },
  initialState: initialPlayerContextState,
});

export const { setTrack, nextTrack, prevTrack } = playerSlice.actions;
export default playerSlice.reducer;
