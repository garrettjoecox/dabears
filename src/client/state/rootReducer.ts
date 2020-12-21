import { combineReducers } from '@reduxjs/toolkit';
import playerSlice from './playerSlice';

export default combineReducers({
  player: playerSlice,
});
