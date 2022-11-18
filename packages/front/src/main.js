import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRotateRight, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCirclePlus, faCircleXmark, faGear, faRightFromBracket, faSquareCaretDown, faTrashCan, faUserCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import store from './store';
import router from './router/index';

library.add(faArrowRotateRight, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCirclePlus, faGear, faRightFromBracket, faSquareCaretDown, faTrashCan, faUserCheck, faXmark, faCircleXmark);

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
