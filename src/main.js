import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import router from "./router";

createApp(App).use(router)
    .use(PrimeVue, {
    unstyled: true})
    .mount('#app');

