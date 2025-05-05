import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignUp from '../views/SignUp.vue';
import LoginPage from '../views/LoginPage.vue';
import store from '../store'; // penting! agar bisa akses state Vuex

const routes = [
  { path: '/', name: 'homepage', component: HomePage },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'loginpage', component: LoginPage },
  // contoh halaman yang butuh login:
  // {
  //   path: '/wishlist',
  //   name: 'wishlist',
  //   component: () => import('../views/Wishlist.vue'), // misalnya
  //   meta: { requiresAuth: true }
  // }
];

// Buat router dulu
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Tambahkan middleware di sini setelah router dibuat
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
