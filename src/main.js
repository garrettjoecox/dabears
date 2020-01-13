import Vue from 'vue';

import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import router from './router';
import App from './App.vue';

library.add(faPlay, faClock);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
