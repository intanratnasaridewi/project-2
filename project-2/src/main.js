import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

// import { createRouter, createWebHistory } from 'vue-router';
import router  from './components/router/index.js';
import store from './components/store/index.js';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Gunakan bundle untuk popper, modal, dsb.
import 'bootstrap-icons/font/bootstrap-icons.css'; // Jika pakai ikon

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return { top: 0 };
//   },
// });

const app = createApp(App);
app.use(store); // Aktifkan jika kamu pakai Vuex
app.use(router);
app.mount('#app');
