import Vue from 'vue';
import Vuex from 'vuex';

import tracks from '../assets/tracks.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTrack: null,
    scrubber: null,
    player: null,
  },
  mutations: {
    setCurrentTrack(state, trackId) {
      state.currentTrack = tracks.find(t => t.id === trackId);
      state.player.load();
      state.player.play();
    },
    setPlayer(state, player) {
      state.player = player;
    },
  },
  actions: {

  },
});
