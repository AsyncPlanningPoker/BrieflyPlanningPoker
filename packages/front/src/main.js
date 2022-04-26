import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router/index';

createApp(App).use(router).use(store).mount('#app');
