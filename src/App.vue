<template>
  <div id="app">
    <router-view id="view" />
    <Player/>
  </div>
</template>

<style lang="scss">

$body-bg: #000;
$body-color: #EEE;

@import '../node_modules/bootstrap/scss/bootstrap';

#app {
  max-height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  user-select: none;
}
#view {
  flex: 1;
  overflow: scroll;
}
</style>

<script>
import Player from './components/Player.vue';

export default {
  components: {
    Player,
  },
};
</script>
