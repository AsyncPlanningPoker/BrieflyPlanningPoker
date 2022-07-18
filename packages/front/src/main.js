import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGear, faCirclePlus, faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue';
import store from './store';
import router from './router/index';

library.add(faGear, faCirclePlus, faCircleChevronLeft, faCircleChevronRight);

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
