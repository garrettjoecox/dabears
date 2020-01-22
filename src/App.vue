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
  display: flex;
  flex-direction: column;
  user-select: none;
}
#view {
  flex: 1;
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
