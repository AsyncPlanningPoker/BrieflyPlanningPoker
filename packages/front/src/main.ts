
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRotateRight, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCirclePlus,
    faCircleXmark, faGear, faLock, faRightFromBracket, faTrashCan, faUserCheck, faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowRotateRight, faCircleCheck, faCircleChevronDown, faCircleChevronUp, faCirclePlus,
    faGear, faLock, faRightFromBracket, faTrashCan, faUser, faUserCheck, faXmark, faCircleXmark);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
