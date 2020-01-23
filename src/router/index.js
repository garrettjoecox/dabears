import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import TrackDetails from '../views/TrackDetails.vue';
import tracks from '../assets/tracks.json';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/:trackId',
    name: 'track-details',
    component: TrackDetails,
    props: route => ({
      track: tracks.find(track => track.id === route.params.trackId),
    }),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },

});

export default router;
