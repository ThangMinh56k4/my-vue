import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import elementPlus from 'element-plus';

import layout from '@/components/layout/default.vue';

import './assets/sass/main.scss';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.component('main-layout', layout);

app.use(createPinia());
app.use(router);
app.use(elementPlus);

app.mount('#app');
