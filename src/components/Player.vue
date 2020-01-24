<template>
  <div class="player d-flex align-items-center">
    <audio class="player-ref flex-fill" controls preload="none" controlsList="nodownload" ref="player">
      <source v-if="currentTrack" :src="`https://dabears.s3.amazonaws.com/${currentTrack.id}.mp3`" type="audio/mp3"> Your browser does not support the audio element.
    </audio>
  </div>
</template>

<style lang="scss">
.player {
  width: 100%;
  max-width: 100vw;
  background: #111;
  position: fixed;
  bottom: 0;
}
.player-ref {
  max-width: 100vw;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    this.$store.commit('setPlayer', this.$refs.player);
  },

  computed: {
    ...mapState(['currentTrack']),
  },
};
</script>
