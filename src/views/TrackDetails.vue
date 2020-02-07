<template>
  <div class="track-details">
    <div class="container">
      <a @click="$router.push({ name: 'home' })" class="back-button d-inline-block p-3">
        <font-awesome-icon icon="chevron-left" color="#FFFFFF" />
      </a>
      <div class="header d-flex flex-wrap justify-content-center justify-content-md-start">
        <div class="art" :style="{backgroundImage: `url(${require('../assets/art/' + track.id + '.jpg')})`}" />
        <div class="info d-flex flex-column justify-content-end align-items-center align-items-md-start px-4">
          <h1 class="font-weight-bold m-0">{{track.title}}</h1>
          <div class="mt-2">{{track.tags.join(', ')}}</div>
          <div class="text-muted">{{new Date(track.date).getFullYear()}} &#8226; {{track.tracklist.length}} songs, 46 min</div>
          <div class="actions mt-3">
            <button @click="setCurrentTrack(track.id)" class="btn btn-success rounded-pill text-uppercase px-5">Play</button>
          </div>
        </div>
      </div>
      <div class="table mt-3">
        <table class="w-100">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th class="text-right"><font-awesome-icon icon="clock" color="#6c757d" /></th>
          </tr>
          <tr v-for="song in track.tracklist" :key="song.title">
            <td v-html="song.title"/>
            <td class="hide-overflow" v-html="song.artist"/>
            <td class="text-right">3:40</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.track-details {
  padding-bottom: 3rem;

  .back-button {
    font-size: 1.3rem;
    cursor: pointer;
    margin-left: -1rem;
  }

  .header {
    .art {
      width: 350px;
      height: 273px;
      background-color: #111;
      background-size: cover;
      background-position: center;
    }
    .info {

      .actions {

        .btn {
          font-size: 12px;
          letter-spacing: 2px;
        }
      }
    }
  }

  .table {


    th {
      border: 0;
      color: #6c757d;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    td {
      border-color: #222;
    }

    .hide-overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 25vw;
    }
  }
}
</style>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'track-details',
  props: ['track'],
  methods: {
    ...mapMutations(['setCurrentTrack']),
  },
};
</script>
