/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import tracksSource from '../../../public/tracks.json';

type PlayerContextState = {
  track: number;
  playbackState: MediaSessionPlaybackState;
};

const initialPlayerContextState: PlayerContextState = {
  track: 0,
  playbackState: 'none',
};

const playerSlice = createSlice({
  name: 'player',
  reducers: {
    play: (state) => {
      state.playbackState = 'playing';
    },
    pause: (state) => {
      state.playbackState = 'paused';
    },
    playTrack: (state, action: PayloadAction<number>) => {
      state.track = action.payload;
      state.playbackState = 'playing';
    },
    setTrack: (state, action: PayloadAction<number>) => {
      state.track = action.payload;
    },
    nextTrack: (state) => {
      state.track = (state.track + 1) % tracksSource.length;
      state.playbackState = 'playing';
    },
    prevTrack: (state) => {
      state.track = (state.track - 1 + tracksSource.length) % tracksSource.length;
      state.playbackState = 'playing';
    },
  },
  initialState: initialPlayerContextState,
});

export const { play, pause, playTrack, setTrack, nextTrack, prevTrack } = playerSlice.actions;
export default playerSlice.reducer;
