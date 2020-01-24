<template>
  <div class="home">
    <div class="track-list d-flex flex-wrap justify-content-center">
      <div v-for="track in tracks" :key="track.origin" class="track m-3">
        <router-link :to="`/${track.id}`" class="track-art d-flex" :style="{backgroundImage: `url(${require('../assets/art/' + track.id + '.jpg')})`}">
          <div class="track-overlay flex-fill d-flex align-items-center justify-content-center">
            <div @click.prevent="setCurrentTrack(track.id)" class="d-none d-md-flex play-button align-items-center justify-content-center">
              <font-awesome-icon icon="play" color="#FFFFFF" />
            </div>
          </div>
        </router-link>
        <div class="font-weight-bold mt-3">{{track.title}}</div>
        <div class="text-muted">
          <span v-for="tag in track.tags" :key="tag">{{tag}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  padding-bottom: 3rem;

  .track-art {
    width: 240px;
    height: 187px;
    background: #111;
    background-size: contain;

    &:hover {
      .track-overlay {
        opacity: 1;
      }
    }

    .track-overlay {
      opacity: 0;
      background: rgba(0,0,0,0.3);
      transition: all 100ms ease;
    }

    .play-button {
      transition: all 100ms ease;
      border-radius: 100%;
      border: 1px solid #EEE;
      width: 50px;
      height: 50px;
      background: rgba(0,0,0,0.3);

      &:hover {
        width: 55px;
        height: 55px;
        background: rgba(0,0,0,0.6);
      }
    }
  }
}
</style>

<script>
import { mapMutations } from 'vuex';

import tracks from '../assets/tracks.json';

export default {
  name: 'home',
  data: () => ({
    tracks,
  }),

  methods: {
    ...mapMutations(['setCurrentTrack']),
  },
};
</script>
