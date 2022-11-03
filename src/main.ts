import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import '/assets/bulma.min.css';
import '/assets/main.css';
import VueLazyLoad from 'vue3-lazyload';
import { securedInstance, plainInstance } from './axiosPlugin';
import {socket} from '@/socket';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);
app.use(VueLazyLoad, {
});

app.use(VueToast, {
  position: 'top-right',
  duration: 5000,
});

app.config.globalProperties.$socket = socket;
app.use(store).use(router).use(VueAxios, { $securedAxios: securedInstance, $plainAxios: plainInstance}).mount('#app');
