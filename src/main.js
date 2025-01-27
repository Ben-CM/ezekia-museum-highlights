import { createApp } from 'vue'
import App from './App.vue'
import './global.scss'

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";
import { faBone } from "@fortawesome/free-solid-svg-icons";

library.add(faWater, faFishFins, faBone);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";



const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')